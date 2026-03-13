import type { Metadata } from "next";

export const createPageMetadata = (
  title: string,
  description: string,
  path: string,
  image?: string,
): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url, // ✅ Correct place
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Abaseen",
      images: [
        {
          url: image || `${baseUrl}/images/logo.webp`,
          width: 1200,
          height: 630,
          alt: "Abaseen",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || `${baseUrl}/images/logo.webp`],
    },
  };
};
