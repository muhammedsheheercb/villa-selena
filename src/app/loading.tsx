"use client";
import React from "react";

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "Villa Selene" }) => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Elegant pulse animation */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1a1a1a] opacity-20"></div>
          <div className="relative inline-flex h-8 w-8 rounded-full bg-[#1a1a1a]"></div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="font-editors-note text-2xl font-[500] tracking-wider text-[#1a1a1a] uppercase">
            {message}
          </h2>
          <p className="font-inter text-xs font-[400] tracking-[2px] text-[#888] uppercase animate-pulse">
            Loading Experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
