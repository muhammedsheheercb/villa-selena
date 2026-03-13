import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";

interface SidebarProps {
  children: React.ReactNode;
}

const Links = [
  { name: "Home", href: "/" },
  { name: "Our Story", href: "/our-story" },
  { name: "Contact", href: "/contact" },
];

const Sidebar: FC<SidebarProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="left"
        className="w-11/12 [&>button]:hidden bg-transparent backdrop-blur-2xl border-l-[1px] border-background px-5 pr-12 pl-8  py-7"
      >
        <SheetTitle>
          <div className="flex flex-row-reverse items-center justify-between pt-10 pb-8">
            <Image
              src="/images/logo.svg"
              width={197}
              height={192}
              alt="logo"
              className="w-28"
            />
            <SheetClose className="border-none ring-0 text-background">
              <XIcon className="h-8 w-8 text-background" />
            </SheetClose>
          </div>
        </SheetTitle>
        <SheetDescription className="flex w-full flex-col items-start justify-start gap-7 mt-12 ml-3">
          {Links.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className="font-editors-note flex w-full justify-start p-0 text-2xl font-[300] tracking-[2px] text-background"
            >
              {link.name}
            </Link>
          ))}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
