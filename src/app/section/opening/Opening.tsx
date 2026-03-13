import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FadeInUp, ParallaxImage } from "@/components/Animation";

const Opening: React.FC = () => {
  return (
    <section className="relative h-full md:h-screen w-full flex flex-col justify-center items-center gap-16 px-4 md:px-[100px] py-14 md:py-24">
      <ParallaxImage className="absolute w-full h-full left-0 top-0 overflow-hidden">
        <Image
          src="/images/home/opening/opening.webp"
          alt="Background Image"
          fill
          className="object-cover brightness-50 object-center"
          sizes="100vw"
        />
      </ParallaxImage>

      <div className="w-fit flex justify-center flex-col items-center text-center gap-5 z-20">
        <FadeInUp delay={0.2} duration={0.8} className="flex flex-col items-center gap-5">
          <h1 className="font-canela font-[100] text-3xl lg:text-5xl md:text-4xl text-[#FFFDE8]">
            Opening Hours
          </h1>
          <div className="w-fit">
            <h2 className="text-[#FFFDE8] font-inter md:text-xl lg:text-2xl">
              Open Daily
            </h2>
            <h2 className="text-[#FFFDE8] font-inter md:text-xl lg:text-2xl">
              6:30 AM – 11:00 PM
            </h2>
          </div>
        </FadeInUp>
      </div>

      <div className="w-fit flex justify-center flex-col text-center gap-5 z-20">
        <FadeInUp delay={0.4} duration={0.8} className="flex flex-col items-center gap-5">
          <h1 className="font-canela  font-[100] text-3xl text-[#FFFDE8] md:text-4xl lg:text-5xl">
            Find Us
          </h1>
          <h2 className="text-[#FFFDE8] font-inter font-light md:text-2xl lg:text-2xl">
            Yas Links
            <br />
            Yas Island, Abu Dhabi
            <br />
            United Arab Emirate
          </h2>
        </FadeInUp>
      </div>

      <div className="z-20">
        <FadeInUp delay={0.6} duration={0.8}>
          <Link href={"#"}>
            <Button
              variant="outline"
              aria-label="Get Direction"
              size="lg"
              className="text-sm lg:text-base md:text-base uppercase font-[400] rounded-none py-6 lg:h-10 md:h-20 lg:w-50 md:w-72 text-[#F0F0F0] border-[#F0F0F0] hover:text-[#F0F0F0] bg-transparent font-inter cursor-pointer"
            >
              get direction
            </Button>
          </Link>
        </FadeInUp>
      </div>
    </section>
  );
};

export default Opening;
