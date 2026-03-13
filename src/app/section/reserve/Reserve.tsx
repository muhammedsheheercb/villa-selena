import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FadeInUp } from "@/components/Animation";

const Reserve: React.FC = () => {
  return (
    <section className="relative h-full w-full flex flex-col-reverse md:flex-col bg-[#091F22] px-4 md:px-[100px] py-14 md:py-24 gap-5 md:gap-0 overflow-x-hidden">
      <div className="flex flex-col justify-start items-start gap-8 md:gap-10">
        <FadeInUp delay={0.2} duration={0.8}>
          <h1 className="font-canela  text-[#FFFDE8] font-[100] text-2xl md:text-6xl max-w-[680px]">
            Whether it&apos;s a sunset dinner, a leisurely lunch, or a private
            celebration — we look forward to welcoming you.
          </h1>
        </FadeInUp>

        <FadeInUp delay={0.4} duration={0.8}>
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

      <div className="flex flex-col justify-center items-center">
        <div className="relative w-full flex justify-center">
          <Image
            src="/images/home/reserve/img.webp"
            alt="Reserve Image"
            width={1216}
            height={759}
            className="w-[900px] h-full object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          <div className="absolute left-0 md:left-16 bottom-0 font-[100] font-canela text-[#FFFDE8] text-[100px] md:text-[250px] leading-[100%] overflow-hidden">
            <FadeInUp delay={0.8} duration={1}>
              reserve
            </FadeInUp>
          </div>
        </div>

        <div className="relative w-full h-[120px] md:h-[150px]">
          <div className="absolute right-0 md:right-16 top-4 font-[100] md:top-0 font-canela text-[100px] md:text-[250px] leading-[50%] text-[#FFFDE8]">
            <FadeInUp delay={0.8} duration={1}>
              table
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reserve;
