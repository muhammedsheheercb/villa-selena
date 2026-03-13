import { FadeInUp, StaggerTextReveal } from "@/components/Animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const JoinUs = () => {
  return (
    <section
      className="relative flex w-full items-center justify-center px-4 py-24 md:py-36"
      style={{
        backgroundImage: "url(/images/home/flavour/img2.webp)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  bg-black/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 text-center md:px-0">
        <div className="flex flex-col items-center justify-center gap-4">
          <FadeInUp>
            <h1 className="font-inter text-xs tracking-[2px] text-white/90 uppercase drop-shadow-md">
              Experience the exceptional
            </h1>
          </FadeInUp>

          <StaggerTextReveal
            text="A Sanctuary of Mediterranean Taste"
            className="text-5xl font-[300] font-canela text-white md:text-7xl justify-center leading-tight tracking-tight"
          />
        </div>

        <FadeInUp delay={0.3}>
          <p className="font-inter max-w-2xl text-center text-base leading-[1.8] font-[300] text-white/90 drop-shadow-sm md:text-lg">
            Whether you join us for a sun-drenched lunch overlooking the greens
            or an intimate dinner under the stars, Villa Selene promises a
            culinary journey that lingers in memory. Authentic flavors, refined
            service, and the timeless charm of the Mediterranean await.
          </p>
        </FadeInUp>

        <FadeInUp
          delay={0.5}
          className="flex flex-col items-center justify-center gap-4 md:flex-row pt-6"
        >
          <Link href={"/contact"}>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full cursor-pointer border-white bg-transparent px-8 py-6 font-inter text-xs uppercase tracking-[2px] text-white hover:bg-white hover:text-[#1a1a1a] transition-colors"
            >
              contact
            </Button>
          </Link>
        </FadeInUp>
      </div>
    </section>
  );
};

export default JoinUs;
