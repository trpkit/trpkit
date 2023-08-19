use actix_web::http::header;
use actix_web::web::{Data, Json, Path};
use actix_web::{error, Error, HttpResponse};
use mongodb::bson;
use mongodb::Client;
use rand::Rng;
use serde::{Deserialize, Serialize};

const COLL: &str = "shorturls";

// Default route should redirect to our company site.
#[actix_web::get("/")]
pub async fn index() -> Result<HttpResponse, Error> {
    Ok(HttpResponse::PermanentRedirect()
        .insert_header((header::LOCATION, "https://trpkit.com"))
        .finish())
}

// Healthcheck should respond with 200 OK.
#[actix_web::get("/healthcheck")]
pub async fn healthcheck() -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok().finish())
}

#[derive(Serialize, Deserialize)]
pub struct ShortenUrl {
    pub id: String,
    pub url: String,
}

#[derive(Serialize, Deserialize)]
pub struct ShortenUrlRequest {
    pub url: String,
}

#[derive(Serialize)]
pub struct ShortenUrlResult {
    pub id: String,
}

// Create a new short URL
#[actix_web::post("/shorten")]
pub async fn shorten(
    client: Data<Client>,
    url: Json<ShortenUrlRequest>,
) -> Result<HttpResponse, Error> {
    let url = &url.url;

    let url = url::Url::parse(url)
        .map_err(error::ErrorBadRequest)?
        .to_string();

    let coll = client.database("trpk-it").collection::<ShortenUrl>(COLL);

    let id = loop {
        let id: String = rand::thread_rng()
            .sample_iter(&rand::distributions::Alphanumeric)
            .take(3)
            .map(char::from)
            .collect();

        let url = coll
            .find_one(bson::doc!("id": &id), None)
            .await
            .map_err(error::ErrorInternalServerError)?;

        match url {
            None => break id,
            Some(_) => continue,
        }
    };

    coll.insert_one(
        ShortenUrl {
            id: id.clone(),
            url,
        },
        None,
    )
    .await
    .map_err(error::ErrorInternalServerError)?;

    Ok(HttpResponse::Ok().json(ShortenUrlResult { id }))
}

// Redirect to the original URL
#[actix_web::get("/{id}")]
pub async fn redirect(client: Data<Client>, id: Path<String>) -> Result<HttpResponse, Error> {
    let coll = client.database("trpk-it").collection::<ShortenUrl>(COLL);

    let url = coll
        .find_one(bson::doc!("id": id.into_inner()), None)
        .await
        .map_err(error::ErrorInternalServerError)?;

    Ok(match url {
        None => HttpResponse::NotFound().finish(),
        Some(url) => HttpResponse::PermanentRedirect()
            .insert_header((header::LOCATION, url.url))
            .finish(),
    })
}
