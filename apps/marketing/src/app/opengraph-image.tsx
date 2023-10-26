import { ImageResponse } from "next/og";

export const alt = "Trpkit";
export const size = {
  width: 1920,
  height: 1080,
};

export const contentType = "image/png";

export default async function Image() {
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
          }/og/base.jpg)`,
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
          A privacy-first, cookie-free and end-to-end encrypted alternative to Google Analytics.
        </div>
      </div>
    ),
    { ...size }
  );
}
