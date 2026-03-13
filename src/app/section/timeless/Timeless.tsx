import { FadeInUp, ParallaxImage } from "@/components/Animation";
import Image from "next/image";

import React from "react";
const Timeless: React.FC = () => {
  return (
    <section className="relative h-full w-full bg-[#091F22] py-12 md:pt-24 overflow-x-hidden">
      <div className="flex justify-center items-center flex-col gap-4 md:gap-8 py-5">
        <FadeInUp delay={0.4} duration={0.8}>
          <h3 className="font-inter text-[#F0F0F0] tracking-[5px] text-xs md:text-sm uppercase">
            our story
          </h3>
        </FadeInUp>
        <FadeInUp delay={0.4} duration={0.8}>
          <h1 className="font-canela font-[100] capitalize text-5xl md:text-7xl max-w-[350px] md:max-w-[700px] text-center text-[#FFFDE8]">
            Timeless flavours with effortless{" "}
            <span className="italic">coastal elegance</span>
          </h1>
        </FadeInUp>
        <FadeInUp delay={0.4} duration={0.8}>
          <p className="font-inter font-[300] max-w-[350px] md:max-w-[700px] text-[#FFFDE8] text-center text-sm md:text-lg mt-4">
            Villa Sélène is a refined Mediterranean dining destination where
            Riviera-inspired cuisine meets the relaxed elegance of coastal Abu
            Dhabi. Overlooking the championship Yas Links golf course and the
            Arabian Gulf, Sélène invites guests to linger over long lunches,
            sunset aperitivos, and elevated evenings by the sea.With stylish
            interiors, open terraces, and sun-drenched ambience, every visit is
            designed to feel effortless, elegant, and timeless.
          </p>
        </FadeInUp>
      </div>

      <div className="flex justify-center items-center gap-5 mt-12 md:mt-20 flex-row">
        <ParallaxImage className="w-[100px] md:w-[250px] h-[170px] md:h-[400px] shrink-0">
          <Image
            src="/images/home/time/a.webp"
            alt="Image"
            fill
            className="w-full h-[170px] md:h-[400px] object-cover"
            sizes="(max-width: 768px) 33vw, 20vw"
          />
        </ParallaxImage>
        <ParallaxImage className="w-[200px] md:w-[450px] h-[250px] md:h-[600px] shrink-0">
          <Image
            src="/images/home/time/b.webp"
            alt="Image"
            fill
            className="w-full h-[250px] md:h-[600px] object-cover"
            sizes="(max-width: 768px) 50vw, 30vw"
          />
        </ParallaxImage>
        <ParallaxImage className="w-[120px] md:w-[250px] h-[200px] md:h-[400px] shrink-0">
          <Image
            src="/images/home/time/c.webp"
            alt="Image"
            fill
            className="w-full h-[200px] md:h-[400px] object-cover"
            sizes="(max-width: 768px) 33vw, 20vw"
          />
        </ParallaxImage>
        <ParallaxImage className="hidden md:block w-[300px] h-[200px] shrink-0">
          <Image
            src="/images/home/time/d.webp"
            alt="Image"
            fill
            className="w-full h-[200px] object-cover"
            sizes="20vw"
          />
        </ParallaxImage>
        <ParallaxImage className="hidden md:block w-[250px] h-[400px] shrink-0">
          <Image
            src="/images/home/time/e.webp"
            alt="Image"
            fill
            className="w-full h-[400px] object-cover"
            sizes="20vw"
          />
        </ParallaxImage>
      </div>
    </section>
  );
};

export default Timeless;

{
  /* <StaggeredContainer
  className="flex justify-center items-center gap-5 mt-12 md:mt-20 flex-row"
  staggerDelay={0.1}
>
  <ParallaxImage className="w-auto h-[170px] md:h-[400px] aspect-[1.5]">
    <Image
      src="/images/home/time/a.webp"
      alt="Timeless Coastal Elegance"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 33vw, 25vw"
    />
  </ParallaxImage>

  <ParallaxImage className="w-auto h-[250px] md:h-[600px] aspect-[1.5]">
    <Image
      src="/images/home/time/b.webp"
      alt="Timeless Coastal Elegance"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 33vw, 25vw"
    />
  </ParallaxImage>

  <ParallaxImage className="w-auto h-[200px] md:h-[400px] aspect-[1.5]">
    <Image
      src="/images/home/time/c.webp"
      alt="Timeless Coastal Elegance"
      fill
      className="object-cover"
      sizes="(max-width: 768px) 33vw, 25vw"
    />
  </ParallaxImage>

  <ParallaxImage className="hidden md:block w-auto h-52 md:w-[300px] md:h-[200px]">
    <Image
      src="/images/home/time/d.webp"
      alt="Timeless Coastal Elegance"
      fill
      className="object-cover"
      sizes="20vw"
    />
  </ParallaxImage>

  <ParallaxImage className="hidden md:block w-auto h-52 md:h-[400px] aspect-[1.5]">
    <Image
      src="/images/home/time/e.webp"
      alt="Timeless Coastal Elegance"
      fill
      className="object-cover"
      sizes="20vw"
    />
  </ParallaxImage>
</StaggeredContainer>; */
}
