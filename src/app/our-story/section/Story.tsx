import { FadeInUp, StaggerTextReveal } from "@/components/Animation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Story: React.FC = () => {
  return (
    <section className="relative h-full w-full py-12 md:py-24 bg-background">
      <div className="flex h-full w-full flex-col items-center justify-center gap-12 px-4 md:flex-row md:gap-24 md:px-[100px] lg:px-[150px]">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full overflow-hidden rounded-tr-[100px] rounded-bl-[100px] h-[500px] shadow-2xl shadow-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1974&auto=format&fit=crop"
              alt="Villa Selene Culinary Craft"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex w-full flex-col items-start justify-center gap-6 md:w-1/2">
          <FadeInUp>
            <h4 className="font-inter text-xs font-[500] tracking-[2px] text-[#888888] uppercase">
              The Journey
            </h4>
          </FadeInUp>

          <StaggerTextReveal
            text="Crafted with Tradition"
            className="text-4xl font-[300] font-canela text-[#1a1a1a] md:text-6xl leading-tight tracking-tight"
          />

          <FadeInUp delay={0.2} className="space-y-6">
            <p className="font-inter text-base font-[300] leading-[1.8] text-[#4a4a4a]">
              Our approach to Mediterranean cuisine is rooted in respect—respect
              for the materials, the methods, and the memories they evoke. We
              prioritize authenticity over complexity, letting the natural
              flavors speak boldly.
            </p>

            <p className="font-inter text-base font-[300] leading-[1.8] text-[#4a4a4a]">
              From hand-rolled pastas to slow-simmered sauces, every dish that
              leaves our kitchen is a testament to the timeless heritage of the
              Mediterranean, reimagined for the modern palate at Yas Links Abu
              Dhabi.
            </p>
          </FadeInUp>

          {/* Action Buttons */}
          <FadeInUp
            delay={0.4}
            className="mt-4 flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-[#1a1a1a] bg-transparent px-8 py-6 font-inter text-xs uppercase tracking-[2px] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300"
              >
                contact us
              </Button>
            </Link>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

export default Story;
