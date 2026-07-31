import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#302a24",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: 320,
            fontWeight: 600,
            fontFamily: "serif",
            color: "#f5f0e6",
            lineHeight: 1,
            letterSpacing: -12,
          }}
        >
          O
        </div>
        {/* clay accent dot */}
        <div
          style={{
            position: "absolute",
            bottom: 120,
            width: 44,
            height: 44,
            borderRadius: 44,
            background: "#cbb74c",
          }}
        />
      </div>
    ),
    size
  );
}
