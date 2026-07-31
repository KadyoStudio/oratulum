import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ora Tulum — Command Center",
    short_name: "Ora",
    description: "Guest, reservation and revenue command center for Ora Tulum.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f4efe7",
    theme_color: "#302a24",
    icons: [
      { src: "/pwa-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/pwa-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    ],
  };
}
