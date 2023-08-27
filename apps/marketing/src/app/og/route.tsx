import { ImageResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title");
  // TODO: Maybe ensure that the illustration is a valid one?
  const illustration = searchParams.has("illustration") ? searchParams.get("illustration") : "base";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundImage: `url(${
            process.env.NEXT_PUBLIC_BASE_URL || "https://trpkit.com"
          }/og/${illustration}.jpg)`,
        }}>
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: "flex",
            fontSize: 48,
            fontFamily: "Arial, sans-serif",
            letterSpacing: "-0.05em",
            fontStyle: "normal",
            color: "white",
            lineHeight: "60px",
            whiteSpace: "pre-wrap",
          }}>
          {title}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
    }
  );
}
