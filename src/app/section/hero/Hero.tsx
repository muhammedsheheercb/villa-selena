import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  HeroHighlightAnimation,
  FadeInUp,
  ScaleUp,
} from "@/components/Animation";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full bg-[#091F22] overflow-hidden">
      <HeroHighlightAnimation className="absolute left-1/2 -translate-x-1/2 z-0 overflow-hidden w-[65%] sm:w-[60%] md:w-[55%] lg:w-[45%] xl:w-[40%] h-[70%] sm:h-[60%] md:h-[70%] lg:h-[80%] md:bottom-0 bottom-[-20%] rounded-t-full">
        <Image
          src="/images/home/hero/herobg.webp"
          alt="Mediterranean fine dining experience"
          className="w-full h-full object-cover object-[40%_15%]"
          width={1920}
          height={1080}
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
        {/* <div className="absolute inset-0 bg-background/20" /> */}
      </HeroHighlightAnimation>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col md:flex-row h-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 py-12 sm:py-16 lg:py-30 mt-28 md:mt-28 lg:mt-20 pointer-events-none">
        <div className="w-full md:w-2/3 pointer-events-auto">
          <div className="flex flex-col">
            <FadeInUp delay={0.2} duration={0.8}>
              <h1 className="font-canela font-light text-[#FFFDE8] leading-[101%] tracking-[-0.01em] text-[40px] sm:text-[56px] md:text-[64px] lg:text-7xl xl:text-[80px]">
                Timeless
                <br />
                Mediterranean
                <br />
                Dining by the Sea
              </h1>
            </FadeInUp>

            <div className="mt-10 sm:mt-12">
              <FadeInUp delay={0.4} duration={0.8} className="hidden md:block">
                <Link href={"/contact"}>
                  <Button
                    variant="outline"
                    aria-label="Reserve"
                    size="lg"
                    className="text-sm uppercase font-[400] rounded-none py-6 text-[#F0F0F0] border-[#F0F0F0] hover:text-[#F0F0F0] bg-transparent font-inter cursor-pointer"
                  >
                    contact us
                  </Button>
                </Link>
              </FadeInUp>
              <FadeInUp delay={0.4} duration={0.8} className="md:hidden">
                <Link href={"/contact"}>
                  <Button
                    variant="outline"
                    aria-label="Reserve"
                    size="lg"
                    className="text-sm uppercase font-[400] rounded-none py-6 text-[#F0F0F0] border-[#F0F0F0] hover:text-[#F0F0F0] bg-transparent font-inter cursor-pointer"
                  >
                    contact us
                  </Button>
                </Link>
              </FadeInUp>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-full md:w-1/3 mt-12 md:mt-0 pointer-events-auto">
          <div className="mb-14 lg:mb-8 mr-[3%] lg:mr-[5%] self-end">
            <ScaleUp delay={0.6} duration={0.8}>
              <Link href="/our-story">
                <Button className="cursor-pointer w-[120px] h-[120px] sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] rounded-full border border-[#FFFDE8]/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-foreground/10 hover:border-foreground/20">
                  <span className="font-canela font-[400px] text-[#FFFDE8] text-base sm:text-lg md:text-xl leading-[1.01] tracking-[-0.01em] text-center">
                    Our
                    <br />
                    Story
                  </span>
                </Button>
              </Link>
            </ScaleUp>
          </div>
          <div className="flex justify-start items-center md:items-start py-10 md:-ml-10">
            <FadeInUp delay={0.8} duration={0.8}>
              <p className="font-canela font-[300px] text-[#FFFDE8] text-xl md:text-lg lg:text-lg leading-[140%] tracking-[-0.01em] md:max-w-[280px] text-left md:text-center">
                Riviera-inspired cuisine
                <br /> overlooking Yas Links <br />
                and the Arabian Gulf.
              </p>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
