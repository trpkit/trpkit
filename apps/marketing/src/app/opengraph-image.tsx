import { ImageResponse } from "next/server";

export const alt = "Trpkit";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/branding/logo.svg`}
          alt="Trpkit LLC"
          width={400}
          height={210}
        />
      </div>
    ),
    { ...size }
  );
}
