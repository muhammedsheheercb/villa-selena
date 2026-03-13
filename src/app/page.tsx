import Navbar from "@/components/Navbar";
import Hero from "./section/hero/Hero";
import dynamic from "next/dynamic";

const Timeless = dynamic(() => import("./section/timeless/Timeless"));
const Flavours = dynamic(() => import("./section/flavours/Flavours"));
const Reserve = dynamic(() => import("./section/reserve/Reserve"));
const Opening = dynamic(() => import("./section/opening/Opening"));
const ExperienceSection = dynamic(() => import("./section/experience/Experience"));
const Footer = dynamic(() => import("@/components/Footer"));
const FollowSection = dynamic(() => import("./section/follow/follow"));
const Signatures = dynamic(() => import("./section/signatures/Signatures"));

export default function HomePage() {
  return (
    <main className="relative flex h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Navbar position="absolute" />
        <Hero />
        <Timeless />
        <Signatures />
        <Flavours />
        <ExperienceSection />
        <Reserve />
        <Opening />
        <FollowSection />
        <Footer />
      </div>
      <div className="fixed right-2 bottom-6 z-50 flex md:right-[48px] md:bottom-[54px]"></div>
    </main>
  );
}
