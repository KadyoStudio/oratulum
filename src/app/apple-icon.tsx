import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1c332b",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 116,
            fontWeight: 600,
            fontFamily: "serif",
            color: "#f5f0e6",
            lineHeight: 1,
            letterSpacing: -5,
          }}
        >
          O
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 42,
            width: 16,
            height: 16,
            borderRadius: 16,
            background: "#c06b3e",
          }}
        />
      </div>
    ),
    size
  );
}
