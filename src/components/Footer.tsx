import Link from "next/link";
import Image from "next/image";
import { getSocialMediaWithIcons, SocialMedia } from "@/lib/socialMedia";
import { getRestaurant } from "@/lib/getRestaurant";

import { FadeInUp, SlideInBottom, FadeInBlock } from "@/components/Animation";

const links = [
  { number: "01", name: "Home", href: "/" },

  { number: "02", name: "About Us", href: "/our-story" },

  { number: "03", name: "Contact us", href: "/contact" },
];

const Footer = async () => {
  const restaurant = await getRestaurant();

  if (!restaurant) {
    return (
      <div className="h-full w-full bg-[#0C1B1D] px-8 py-12">
        <p className="text-center text-[#FFFDE8]">
          Failed to load restaurant data
        </p>
      </div>
    );
  }

  const socialMediaLinks = getSocialMediaWithIcons(
    restaurant?.socialMedias as SocialMedia[],
  );
  const latitude = restaurant?.address?.coords?.[0];
  const longitude = restaurant?.address?.coords?.[1];
  const placeQuery = `${restaurant?.name} ${restaurant?.address?.firstLine} ${restaurant?.address?.city} ${restaurant?.address.postCode}`;

  const mapLink =
    latitude && longitude
      ? `https://www.google.com/maps?q=${latitude},${longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeQuery)}`;

  return (
    <footer className="relative w-full bg-[#091F22] text-[#FFFDE8] pt-12 md:pt-[100px] pb-2 md:pb-[50px] px-4 md:px-[100px] flex flex-col justify-between h-[110vh] md:h-[90vh] overflow-y-hidden">
      <div className="flex flex-col md:flex-row justify-between w-full h-full flex-grow ">
        {/* Left Column: Navigation Links */}
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <nav className="flex flex-col gap-6 w-full">
            {links.map((link, index) => (
              <FadeInUp key={index} delay={index * 0.1} duration={0.6}>
                <Link
                  href={link.href}
                  className="flex items-start gap-3 group w-fit"
                >
                  <span className="font-canela text-[20px] md:text-[24px] font-[300] leading-[50%] tracking-[-0.01em] opacity-80 ">
                    {link.number}
                  </span>
                  <span className="font-canela text-[28px] md:text-[42px] font-[400] leading-[90%] tracking-[-0.01em] group-hover:opacity-70 transition-opacity">
                    {link.name}
                  </span>
                </Link>
              </FadeInUp>
            ))}
          </nav>
        </div>

        {/* Right Column: Contact Information & Logo */}
        <div className="w-full md:w-1/2 flex flex-col justify-between md:ml-36 ">
          <div className="grid grid-cols-2 gap-x-8  gap-y-12">
            {/* Phone */}
            <SlideInBottom delay={0.5} duration={0.7}>
              <div className="flex flex-col gap-2">
                <h3 className="font-canela text-[18px] md:text-[20px] font-light leading-[100%] tracking-[-0.01em] mb-1">
                  Phone
                </h3>
                <Link
                  href={`tel:${restaurant?.contactNumber}`}
                  className="font-inter text-[10px] md:text-[11px] font-normal leading-[140%] uppercase hover:opacity-70 transition-opacity opacity-80"
                >
                  {restaurant?.contactNumber}
                  <br />
                  +971 02 404 3077
                </Link>
              </div>
            </SlideInBottom>

            {/* Hours */}
            <SlideInBottom delay={0.6} duration={0.7}>
              <div className="flex flex-col gap-2">
                <h3 className="font-canela text-[18px] md:text-[20px] font-light leading-[100%] tracking-[-0.01em] mb-1">
                  Hours
                </h3>
                <div className="font-inter text-[10px] md:text-[11px] font-normal leading-[140%] uppercase opacity-80">
                  <p>OPEN DAILY</p>
                  <p>6:30 AM - 11:00 PM</p>
                </div>
              </div>
            </SlideInBottom>

            {/* Email */}
            <SlideInBottom delay={0.7} duration={0.7}>
              <div className="flex flex-col gap-2">
                <h3 className="font-canela text-[18px] md:text-[20px] font-light leading-[100%] tracking-[-0.01em] mb-1">
                  Email
                </h3>
                <Link
                  href={`mailto:${restaurant.email}`}
                  className="font-inter text-[10px] md:text-[11px] font-normal leading-[140%] uppercase hover:opacity-70 transition-opacity break-all md:break-normal opacity-80"
                >
                  {restaurant.email}
                </Link>
              </div>
            </SlideInBottom>

            {/* Location */}
            <SlideInBottom delay={0.8} duration={0.7}>
              <div className="flex flex-col gap-2">
                <h3 className="font-canela text-[18px] md:text-[20px] font-light leading-[100%] tracking-[-0.01em] mb-1">
                  location
                </h3>
                <Link
                  href={mapLink}
                  target="_blank"
                  className="font-inter text-[10px] md:text-[11px] font-normal leading-[140%] uppercase hover:opacity-70 transition-opacity opacity-80"
                >
                  {restaurant?.address?.firstLine}
                  <br />
                  {restaurant?.address?.city}, {restaurant?.address?.postCode}
                  <br />
                  UNITED ARAB EMIRATES
                </Link>
              </div>
            </SlideInBottom>

            {/* Social */}
            <SlideInBottom delay={0.9} duration={0.7}>
              <div className="flex flex-col gap-2">
                <h3 className="font-canela text-[18px] md:text-[20px] font-light leading-[100%] tracking-[-0.01em] mb-1">
                  Social
                </h3>
                <div className="flex flex-col gap-1 opacity-80">
                  {socialMediaLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.pageUrl || "#"}
                      target="_blank"
                      className="font-inter text-[10px] md:text-[11px] font-normal leading-[140%] uppercase hover:opacity-70 transition-opacity"
                    >
                      {social.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SlideInBottom>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full py-8 pb-12 md:pb-8">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 lg:gap-8 mb-8 w-full">
          {/* Desktop Line */}
          <div className="hidden md:block flex-1 border-t border-[#FFFDE8]"></div>
          <FadeInBlock delay={1.0} duration={0.8}>
            <Image
              src="/images/logo.svg"
              alt="Villa Selene"
              width={240}
              height={100}
              className="w-[200px] lg:w-[240px] xl:w-[280px] h-auto"
              sizes="(max-width: 768px) 200px, 280px"
            />
          </FadeInBlock>
          {/* Mobile Line */}
          <div className="md:hidden w-full border-t border-[#FFFDE8] mt-2"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 opacity-80">
          <p className="font-inter text-[10px] md:text-[11px] font-normal leading-[140%] uppercase text-center md:text-left ">
            © 2026 VILLA SELENE
          </p>
          <div className="flex gap-8 md:gap-12 ">
            <Link
              href="/terms-of-services"
              className="font-inter text-[10px] md:text-[11px] font-normal leading-[140%] uppercase hover:opacity-70 transition-opacity"
            >
              TERMS OF SERVICES
            </Link>
            <Link
              href="/privacy-policy"
              className="font-inter text-[10px] md:text-[11px] font-normal leading-[140%] uppercase hover:opacity-70 transition-opacity"
            >
              PRIVACY POLICY
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
