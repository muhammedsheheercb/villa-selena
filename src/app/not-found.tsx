import React from "react";
import { Search, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 text-center">
      {/* 404 Number */}
      <div className="mb-6">
        <h1 className="font-editors-note text-9xl font-[500] leading-none text-[#1a1a1a] opacity-10 md:text-[15rem]">
          404
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative z-10 -mt-16 mb-12 flex flex-col items-center gap-4 md:-mt-24">
        <h2 className="font-editors-note text-4xl font-[500] text-[#1a1a1a] md:text-5xl">
          Page Not Found
        </h2>
        <p className="font-inter max-w-md text-base font-[300] leading-[1.8] text-[#4a4a4a] md:text-lg">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/">
          <Button
            size="lg"
            className="rounded-full bg-[#1a1a1a] px-8 py-6 font-inter text-xs font-[600] tracking-[2px] text-white uppercase hover:bg-[#333]"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <Link href="/contact">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-[#1a1a1a] bg-transparent px-8 py-6 font-inter text-xs font-[600] tracking-[2px] text-[#1a1a1a] uppercase hover:bg-[#1a1a1a] hover:text-white"
          >
            <Search className="mr-2 h-4 w-4" />
            contact
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
