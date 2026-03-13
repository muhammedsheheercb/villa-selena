import ExperienceCard, {
  type Experience,
} from "@/app/section/experience/ExperienceCard";
import { FadeInUp } from "@/components/Animation";

const experiences: Experience[] = [
  {
    image: "/images/home/experience/1.webp",
    tag: "GOLDEN HOURS",
    title: "Sunset Aperitivo",
    schedule: "EVERY MONDAY – THURSDAY · 6PM – 7PM",
    description:
      "As the sun softens, linger a little longer at Villa Sélène. Handpicked drinks and petit plats, crafted for golden evenings of effortless elegance.",
    priceInfo: "Drinks from AED 55 · 25% off selected petit bites",
  },
  {
    image: "/images/home/experience/2.webp",
    tag: "BUSINESS LUNCH",
    title: "Business Lunch",
    schedule: "EVERY MONDAY – FRIDAY · 12PM – 2PM",
    description:
      "Make your midday moments count with a curated business lunch blending refined flavours and seamless service.",
    priceInfo: "Starts from AED 95 · 15% off wine and spirits",
  },
  {
    image: "/images/home/experience/3.webp",
    tag: "SATURDAY RIVIERA BRUNCH",
    title: "A Journey to\nthe Riviera",
    schedule: "EVERY SATURDAY · 12:30PM – 4PM",
    description:
      "A journey to the French Riviera with a lavish Mediterranean spread, flowing beverages, and the charm of long, sunlit afternoons.",
    priceInfo: "From AED 350 per person",
  },
  {
    image: "/images/home/experience/4.webp",
    tag: "PRIVATE DINING & EVENTS",
    title: "Prive at Selene",
    schedule: "AVAILABLE UPON REQUEST",
    description:
      "Step into the timeless charm of Villa Sélène, where private events are elevated with grace, gastronomy, and golden-hour magic. Our Privé Packages offer curated menus, fine beverages, and personalized touches in a secluded coastal setting.",
    priceInfo: "Perfect for milestones, celebrations, and intimate soirées.",
  },
];

const ExperienceSection = () => {
  return (
    <main className="min-h-screen bg-background px-4 md:px-[100px]">
      <header className="pt-20 pb-12 md:pt-28 md:pb-16 text-center px-6">
        <FadeInUp delay={0.2} duration={0.8}>
          <p className="text-xs md:text-sm font-inter font-medium text-[#091F22] tracking-[0.5em] text-center uppercase mb-4">
            Experiences at Sélène
          </p>
        </FadeInUp>
        <FadeInUp delay={0.4} duration={0.8}>
          <h1 className="font-canela text-[50px] font-[100] md:text-[60px] lg:text-[100px] leading-[90%] tracking-[-0.01em] text-center text-[#091F22]">
            Experiences
            <br />
            at Selene
          </h1>
        </FadeInUp>
      </header>

      <section aria-label="Our experiences" className="pb-2">
        {experiences.map((exp, i) => (
          <div
            key={exp.title}
            className="sticky top-28 md:top-36 mb-16 md:mb-24 bg-[#FFFDE8] will-change-transform"
            style={{ zIndex: 10 + i, transform: "translate3d(0,0,0)" }}
          >
            <ExperienceCard experience={exp} />
          </div>
        ))}
      </section>
    </main>
  );
};

export default ExperienceSection;
