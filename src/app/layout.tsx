import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "../styles/ham.css";
import { cn } from "@/lib/utils";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Villa Selene | Refined Mediterranean Dining at Yas Links Abu Dhabi",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ||
      "https://viyagolf.com/yaslinks/dining/villa-selene-restaurant/",
  ),
  alternates: {
    canonical: "/",
  },
  description:
    "Experience the essence of the Riviera at Villa Selene. Located at Yas Links Abu Dhabi, we offer refined Mediterranean cuisine, fresh seafood, and handcrafted pastas with stunning views of the Arabian Gulf.",
  keywords: [
    "Villa Selene",
    "Villa Selene Abu Dhabi",
    "Mediterranean Restaurant Abu Dhabi",
    "Yas Links Dining",
    "Riviera Inspired Cuisine",
    "Seafood Restaurant Abu Dhabi",
    "Best Mediterranean Food Yas Island",
    "Fine Dining Abu Dhabi",
    "Viya Golf Dining",
    "Villa Selene Menu",
    "Outdoor Dining Yas Island",
  ],
  icons: [{ rel: "icon", url: "/images/logo.png" }],
  openGraph: {
    title: "Villa Selene | Refined Mediterranean Dining at Yas Links Abu Dhabi",
    description:
      "Experience the essence of the Riviera at Villa Selene. Located at Yas Links Abu Dhabi, we offer refined Mediterranean cuisine, fresh seafood, and handcrafted pastas with stunning views of the Arabian Gulf.",
    type: "website",
    locale: "en_GB",
    siteName: "Villa Selene",
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa Selene | Refined Mediterranean Restaurant",
    description:
      "Refined Mediterranean cuisine, fresh seafood, and stunning views at Yas Links Abu Dhabi.",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "theme-custom flex min-h-screen font-inter antialiased",
          inter.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
