import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FadeInUp, ParallaxImage } from "@/components/Animation";

const Flavours: React.FC = () => {
  return (
    <section className="relative bg-[#FFFDE8] flex flex-col justify-center items-center h-full w-full  py-14 md:py-24 px-4 md:px-[100px] gap-12 md:gap-20">
      <div className="w-full flex flex-col-reverse md:flex-row gap-9">
        <ParallaxImage className="md:w-[600px] h-[400px] md:h-[600px] shrink-0">
          <Image
            src="/images/home/flavour/img1.webp"
            alt="Flavours of the Mediterranean"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </ParallaxImage>

        <div className="flex flex-col justify-center md:justify-start items-center md:items-start gap-3 md:gap-6 md:pl-12">
          <FadeInUp delay={0.2} duration={0.8} className="w-full">
            <h3 className="w-full font-inter tracking-[3px] text-[#091F22] md:tracking-[5px] text-sm md:text-base text-center md:text-left uppercase">
              Cuisine & Philosophy
            </h3>
          </FadeInUp>

          <FadeInUp delay={0.4} duration={0.8} className="w-full">
            <h1 className="w-full font-canela font-[100] capitalize text-5xl md:text-6xl text-[#091F22] text-center md:text-left mb-2">
              Flavours of the <br /> Mediterranean
            </h1>
          </FadeInUp>

          <FadeInUp
            delay={0.6}
            duration={0.8}
            className="w-full flex justify-center md:justify-start"
          >
            <p className="w-full font-inter max-w-[350px] md:max-w-[500px] text-center md:text-left text-sm md:text-base mb-4">
              Our menu celebrates modern Mediterranean flavours with a focus on
              premium ingredients. From fresh seafood and vibrant seasonal
              dishes to handcrafted pastas and expertly grilled specialities,
              each plate is designed to be shared, savoured, and enjoyed at a
              leisurely pace.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.8} duration={0.8}>
            <Link href={"/contact"}>
              <Button
                variant="outline"
                aria-label="Reserve"
                size="lg"
                className="text-xs lg:text-base md:text-base uppercase font-[400] rounded-none py-6 lg:h-10 md:h-20 lg:w-50 md:w-72 text-[#091F22] border-[#091F22] hover:text-[#0b4249] bg-transparent font-inter cursor-pointer"
              >
                contact us
              </Button>
            </Link>
          </FadeInUp>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-start gap-5">
        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center">
          <FadeInUp
            delay={0.2}
            duration={0.8}
            className="w-full flex justify-center md:justify-start"
          >
            <h1 className="w-full text-[#091F22] max-w-[250px] text-lg md:text-2xl font-[300] text-center md:text-left font-canela">
              Flavour-forward, elegant, and deeply rooted in Mediterranean
              hospitality.
            </h1>
          </FadeInUp>
        </div>

        <div className="relative w-full md:w-2/3 flex justify-between mt-16 md:mt-0">
          <ParallaxImage className="w-[150px] h-[200px] md:w-48 md:h-60 shrink-0">
            <Image
              src="/images/home/flavour/img2.webp"
              alt="Mediterranean Hospitality"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          </ParallaxImage>

          <ParallaxImage className="w-[150px] h-[228px] md:w-48 md:h-60 absolute right-0 -top-12 md:-top-[250px]">
            <Image
              src="/images/home/flavour/img3.webp"
              alt="Mediterranean Hospitality"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 20vw"
            />
          </ParallaxImage>
        </div>
      </div>
    </section>
  );
};

export default Flavours;
