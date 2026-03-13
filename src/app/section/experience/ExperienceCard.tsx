import Image from "next/image";

export interface Experience {
  image: string;
  tag: string;
  title: string;
  schedule: string;
  description: string;
  priceInfo: string;
}

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <article
      className="group min-h-[75svh] md:min-h-full flex flex-col md:grid md:grid-cols-2 pb-5 md:pb-0 gap-6 md:gap-10 lg:gap-16 items-center border border-[#BAB8A0] md:border-[#DDDABF]"
      aria-label={experience.title}
    >
      <div className="overflow-hidden">
        <Image
          src={experience.image}
          alt={`${experience.title} - ${experience.tag}`}
          className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          width={1000}
          height={1000}
        />
      </div>

      <div className={`space-y-4 md:space-y-5 p-4 md:p-6 lg:p-8`}>
        <span className="inline-block rounded-full border border-foreground/30 px-4 py-1.5 text-[10px] md:text-[11px] lg:text-[12px] font-inter font-medium leading-[140%] tracking-[0.05em] uppercase text-[#091F22]">
          {experience.tag}
        </span>

        <h3 className="font-canela text-[38px] md:text-[48px] lg:text-[60px] font-[100] leading-[90%] tracking-[-0.01em] text-[#091F22] whitespace-pre-line">
          {experience.title}
        </h3>

        <p className="text-[14px] md:text-[15px] lg:text-[16px] font-inter font-normal leading-[160%] tracking-[0.06em] uppercase text-[#091F22]">
          {experience.schedule}
        </p>

        <p className="text-[16px] md:text-[17px] lg:text-[18px] font-inter font-[300] leading-[140%] tracking-[0em] text-[#091F22] max-w-[550px]">
          {experience.description}
        </p>

        <p className="text-[14px] md:text-[15px] lg:text-[16px] font-inter font-[300] leading-[160%] tracking-[0em] text-[#091F22]">
          {experience.priceInfo}
        </p>
      </div>
    </article>
  );
};
export default ExperienceCard;
