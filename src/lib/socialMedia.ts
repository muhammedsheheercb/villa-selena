// utils/socialMedia.ts
// Reusable utility for social media links
import React from "react";
import { Icons } from "@/components/Icon";
import type { LucideProps } from "lucide-react";

type IconComponent = (
  props: React.HTMLAttributes<SVGElement> & LucideProps,
) => React.JSX.Element;

export interface SocialMedia {
  _id?: string;
  name: string;
  icon: string;
  data?: {
    url?: string;
  };
  action?: string;
}

export interface SocialMediaWithIcon extends SocialMedia {
  IconComponent: IconComponent;
  pageUrl: string; // The actual URL to link to
}

/**
 * Map social media name to corresponding custom icon
 * @param name - Social media platform name
 * @returns Custom icon component or null
 */
export const getSocialIcon = (name: string): IconComponent | null => {
  const normalizedName = name.toLowerCase().trim();
  const iconMap: Record<string, IconComponent> = {
    facebook: Icons.facebook,
    instagram: Icons.instagram,
    google: Icons.google,
    youtube: Icons.youtube,
    twitter: Icons.twitter,
    tiktok: Icons.tiktok,
    tripadvisor: Icons.unknown,
    tripadviser: Icons.unknown,
  };

  return iconMap[normalizedName] || null;
};

/**
 * Get social media links with their corresponding icons
 * @param socialMedias - Array of social media objects from restaurant data
 * @returns Array of social media with icon components
 */
export const getSocialMediaWithIcons = (
  socialMedias?: SocialMedia[],
): SocialMediaWithIcon[] => {
  if (!socialMedias || socialMedias.length === 0) return [];

  return socialMedias
    .map((social) => {
      const IconComponent = getSocialIcon(social.name);

      // Get the actual page URL from data.url or fallback to icon field
      const pageUrl = social.data?.url || social.icon || "";

      if (!IconComponent || !pageUrl) return null;

      return {
        ...social,
        IconComponent,
        pageUrl,
      };
    })
    .filter((item): item is SocialMediaWithIcon => item !== null);
};

/**
 * Check if a URL is a valid social media link
 * @param url - URL to validate
 * @returns boolean
 */
export const isValidSocialMediaUrl = (url: string): boolean => {
  if (!url) return false;

  try {
    const urlObj = new URL(url);
    const socialDomains = [
      "facebook.com",
      "instagram.com",
      "google.com",
      "maps.google.com",
      "g.co",
      "youtube.com",
      "youtu.be",
      "twitter.com",
      "x.com",
      "tiktok.com",
      "tripadvisor.com",
      "tripadvisor.co.uk",
    ];

    return socialDomains.some((domain) => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
};

/**
 * Format social media URL (ensure it has https://)
 * @param url - URL to format
 * @returns Formatted URL
 */
export const formatSocialMediaUrl = (url: string): string => {
  if (!url) return "";

  // If URL doesn't start with http:// or https://, add https://
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }

  return url;
};

/**
 * Get social media platform name from URL
 * @param url - Social media URL
 * @returns Platform name or 'Unknown'
 */
export const getPlatformFromUrl = (url: string): string => {
  if (!url) return "Unknown";

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    if (hostname.includes("facebook")) return "Facebook";
    if (hostname.includes("instagram")) return "Instagram";
    if (hostname.includes("google") || hostname.includes("g.co"))
      return "Google";
    if (hostname.includes("youtube") || hostname.includes("youtu.be"))
      return "YouTube";
    if (hostname.includes("twitter") || hostname.includes("x.com"))
      return "Twitter";
    if (hostname.includes("tiktok")) return "TikTok";
    if (hostname.includes("tripadvisor")) return "TripAdvisor";

    return "Unknown";
  } catch {
    return "Unknown";
  }
};
