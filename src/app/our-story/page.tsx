import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Hero from "./section/Hero";
import Story from "./section/Story";
import JoinUs from "./section/JoinUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | Villa Selene Mediterranean Restaurant",
  description:
    "Discover the story behind Villa Selene — a celebration of the Mediterranean soul, where every meal is a moment worth lingering over.",
  alternates: {
    canonical: "/our-story",
  },
  openGraph: {
    title: "Our Story | The Essence of Villa Selene",
    description:
      "Explore Villa Selene’s journey, rooted in Mediterranean heritage, craftsmanship, and a passion for authentic flavours.",
    type: "article",
    locale: "en_GB",
    siteName: "Villa Selene",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story | Villa Selene",
    description:
      "Discover the story of Villa Selene, where Mediterranean tradition meets modern refinement.",
  },
};

const page = ({}) => {
  return (
    <main className="relative flex h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center bg-background">
        <Navbar position="absolute" />
        <Hero />
        <Story />
        <JoinUs />
        <Footer />
      </div>
    </main>
  );
};

export default page;
