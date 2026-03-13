"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

const Navbar = ({
  position = "static",
}: {
  position?: "static" | "fixed" | "absolute";
}) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={cn(
        position,
        "top-0 lg:top-0 left-0 z-50 w-full transition-all duration-300 py-5 lg:px-[100px] bg-transparent",
        isScrolled && "bg-background fixed",
        pathname !== "/" && "bg-background fixed",
      )}
    >
      {/*big screen */}
      <div className="hidden relative px-4 lg:flex items-center justify-between">
        <div className="flex items-center justify-center gap-8">
          <Link
            href={"/"}
            className={` font-inter text-sm font-[500] tracking-[2px] text-[#F0F0F0] uppercase hover:underline ${isScrolled || pathname !== "/" ? "text-foreground" : ""}`}
          >
            Home
          </Link>

          <Link
            href={"/our-story"}
            className={` font-inter text-sm font-[500] tracking-[2px] text-[#F0F0F0] uppercase hover:underline ${isScrolled || pathname !== "/" ? "text-foreground" : ""}`}
          >
            About Us
          </Link>
        </div>
        <Image
          src="/images/logo.svg"
          width={396}
          height={185}
          alt="logo"
          className={cn(
            "w-[110px]  h-[50px] absolute left-1/2 -translate-x-1/2",
            isScrolled || pathname !== "/" ? "brightness-0" : "",
          )}
        />
        <div className="flex items-center justify-center gap-8">
          <Link
            href={"/contact"}
            className={` font-inter text-sm font-[500] text-[#F0F0F0] tracking-[2px] uppercase hover:underline ${isScrolled || pathname !== "/" ? "text-foreground" : ""}`}
          >
            Contact
          </Link>
        </div>
      </div>

      {/*mobile screen */}
      <div
        className={cn(
          "relative px-4 py-2 lg:hidden",
          isScrolled && "py-1",
          pathname !== "/" && "py-1",
        )}
      >
        <div className="w-fit absolute left-2">
          <Sidebar>
            <Menu
              className={cn(
                "w-12 h-8 text-[#F0F0F0]",
                isScrolled && "text-foreground",
                pathname !== "/" && "text-foreground",
              )}
            />
          </Sidebar>
        </div>
        <div className="flex flex-row items-center justify-center">
          <Link href={"/"}>
            <Image
              src={"/images/logo.svg"}
              width={396}
              height={185}
              alt="logo"
              priority
              className={cn(
                "w-28 h-[37px]",
                isScrolled && "brightness-0 w-28",
                pathname !== "/" && "brightness-0 w-28",
              )}
            />
          </Link>
        </div>
      </div>
      <div
        className={cn(
          "absolute w-full bottom-0 left-0",
          isScrolled || pathname !== "/" ? "md:px-0" : "md:px-[100px]",
        )}
      >
        <div
          className={cn(
            "w-full border-b-[1px] border-b-primary-foreground",
            isScrolled && "border-b-foreground",
            pathname !== "/" && "border-b-foreground",
          )}
        />
      </div>
    </nav>
  );
};

export default Navbar;

// const EqualizerIcon: React.FC = () => {
//   return (
//     <div className="equalizer-icon rotate">
//       <div className={`bar bg-background`}></div>
//       <div className={`bar bg-background`}></div>
//       <div className={`bar bg-background`}></div>
//     </div>
//   );
// };
