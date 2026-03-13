import { ScaleIn, SlideInBottom } from "@/components/Animation";
import Image from "next/image";

const FollowSection = () => {
  return (
    <section
      className="w-full bg-background  py-12 md:py-24 md:px-[100px] md:grid  md:grid-cols-12 md:gap-10 xl:gap-20 mx-auto"
      aria-labelledby="follow-heading"
    >
      {/*
        Text Section
        Mobile: Top of screen, centered.
        Desktop: Grid Item, Col 1-3, Row 1.
      */}
      <div className="w-full mb-8 md:mb-0 md:col-span-3 md:col-start-1 md:row-start-1">
        <SlideInBottom delay={0.1} duration={0.8}>
          <div className="text-center md:text-left flex flex-col gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#0A1D20]">
              Follow Us
            </p>
            <h2
              id="follow-heading"
              className="font-canela font-[100] leading-[100%] text-[#0A1D20] text-5xl md:text-7xl whitespace-nowrap"
            >
              Life at
              <br />
              Villa Selene
            </h2>
            <p className="font-canela text-sm md:text-2xl text-[#0A1D20]">
              @Villa Sélène
            </p>
          </div>
        </SlideInBottom>
      </div>

      {/*
        Image Group Wrapper
        Mobile: Relative container with overflow hidden to crop absolute images.
        Desktop: `contents` allows children to participate directly in the parent Grid.
      */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden flex items-end justify-center md:contents">
        {/*
          Image 1 (Left / Bottom-Left)
          Mobile: Absolute, Left 0, 35% width, Translate X -50%
          Desktop: Static, Full width of Col 1-3, Row 2 (Self-end)
        */}
        {/*
          Image 1 (Left / Bottom-Left)
          Mobile: Absolute, Left 0, 35% width, Translate X -50%
          Desktop: Static, Full width of Col 1-3, Row 2 (Self-end)
        */}
        <div className="absolute left-0 w-[35%] h-[50%] -translate-x-[50%] z-0 md:static md:translate-x-0 md:w-full md:h-[100%] md:col-span-3 md:col-start-1 md:row-start-2 md:self-end">
          <div className="overflow-hidden rounded-t-full h-full w-full">
            <ScaleIn className="w-full h-full" delay={0.2} duration={0.7}>
              <Image
                width={500}
                height={500}
                src={"/images/home/follow/1.webp"}
                alt="Golden pastries from Villa Sélène"
                className="h-full w-full object-cover "
                sizes="(max-width: 768px) 35vw, 25vw"
                loading="lazy"
              />
            </ScaleIn>
          </div>
        </div>

        {/*
          Image 2 (Center / Large)
          Mobile: 50% width, full height, z-10 (Flex Item)
          Desktop: Full width, Col 4-8 (Span 5), Row 1-2
        */}
        <div className="w-[50%] h-full z-10 md:w-full md:h-full md:col-span-5 md:col-start-4 md:row-start-1 md:row-span-2 md:flex md:justify-end md:items-end">
          <div className="relative overflow-hidden rounded-t-full w-full h-full md:w-[65%] md:h-[70%] lg:w-[75%] lg:h-[90%]">
            <ScaleIn
              className="w-full h-full"
              delay={0.2}
              duration={0.7}
              targetScale={1.2}
            >
              <Image
                width={500}
                height={500}
                src={"/images/home/follow/2.webp"}
                alt="Orange cocktail with grapefruit garnish at Villa Sélène"
                className="h-full w-full object-cover  object-top   "
                sizes="(max-width: 768px) 50vw, 40vw"
                loading="lazy"
              />
            </ScaleIn>
          </div>
        </div>

        {/*
          Image 3 & 4 Container (Right Column)
          Mobile: Absolute, Right 0, 35% width, Height 280px, Translate X 50%
          Desktop: Static, Col 9-12 (Span 4), Row 1-2. Flex-col justified.
        */}
        <div className="absolute right-0 w-[35%] h-[280px] translate-x-[50%] flex flex-col justify-between md:static md:translate-x-0 md:w-full md:h-full md:col-span-4 md:col-start-9 md:row-start-1 md:row-span-2 md:items-end">
          {/* Image 3 (Top/Middle) */}
          <div className="self-center overflow-hidden rounded-b-full w-[70%] h-[55%]">
            <ScaleIn className="w-full h-full" delay={0.2} duration={0.7}>
              <Image
                width={500}
                height={500}
                src={"/images/home/follow/3.webp"}
                alt="Perfectly grilled steak"
                className="h-full w-full scale-110 object-[25%_25%] object-cover"
                sizes="(max-width: 768px) 35vw, 33vw"
                loading="lazy"
              />
            </ScaleIn>
          </div>

          {/* Image 4 (Bottom) */}
          <div className="flex justify-end h-[20%] w-[60%]">
            <div
              className="w-1/2 overflow-hidden rounded-t-full"
              style={{ aspectRatio: "1/1" }}
            >
              <ScaleIn className="w-full h-full" delay={0.2} duration={0.7}>
                <Image
                  width={500}
                  height={500}
                  src={"/images/home/follow/4.webp"}
                  alt="Pink cocktail"
                  className="h-full w-full object-cover scale-x-[-1] md:scale-x-[-1.1] md:scale-y-110"
                  sizes="(max-width: 768px) 20vw, 15vw"
                  loading="lazy"
                />
              </ScaleIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FollowSection;
