import { FadeInUp, StaggerTextReveal } from "@/components/Animation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative w-full py-24 md:py-32 bg-[#091F22]">
      <div className="mx-auto flex max-w-[1440px] flex-col-reverse items-center justify-between gap-16 px-4 md:flex-row md:gap-24 md:px-[100px] lg:px-[150px]">
        {/* Left: Text Content */}
        <div className="flex w-full flex-col items-start justify-center gap-6 md:w-1/2">
          <StaggerTextReveal
            text="Our Story"
            className="text-5xl font-[300] font-canela text-[#FFFDE8] md:text-7xl leading-tight tracking-tight"
          />
          <FadeInUp delay={0.2}>
            <h4 className="font-inter text-base font-[300] leading-[1.8] tracking-[0.5px] text-[#F0F0F0]/80 max-w-[500px]">
              Villa Selene was born from a simple desire: to bring the authentic
              soul of Mediterranean dining to the serene landscapes of Yas Links
              Abu Dhabi. More than a restaurant, it is a tribute to tradition,
              flavor, and the art of lingering over a meal.
            </h4>
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <Link href={"/contact"}>
              <Button
                variant="outline"
                size="lg"
                aria-label="contact"
                className="text-sm uppercase font-[400] w-[150px] rounded-full py-6 text-[#FFFDE8] border-[#FFFDE8]/20 hover:text-[#091F22] hover:bg-[#FFFDE8] bg-transparent font-inter cursor-pointer transition-all duration-300"
              >
                contact us
              </Button>
            </Link>
          </FadeInUp>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-full overflow-hidden rounded-tl-[100px] rounded-br-[100px] h-[400px] md:h-[600px] shadow-2xl shadow-black/20">
            <Image
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
              alt="Villa Selene Interior"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
