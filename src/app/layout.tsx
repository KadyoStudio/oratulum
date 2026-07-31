import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ora Tulum — Command Center",
  description: "Guest, reservation and revenue command center for Ora Tulum.",
  applicationName: "Ora",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Ora",
  },
};

export const viewport: Viewport = {
  themeColor: "#302a24",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
