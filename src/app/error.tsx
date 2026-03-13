"use client";
import React from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error?: Error;
  reset?: () => void;
  title?: string;
  message?: string;
}

const Error: React.FC<ErrorProps> = ({
  error,
  reset,
  title = "Something went wrong",
  message = "We're experiencing some technical difficulties.",
}) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 text-center">
      {/* Icon */}
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-500">
        <AlertCircle className="h-10 w-10" />
      </div>

      {/* Main Content */}
      <div className="mb-12 flex flex-col items-center gap-4">
        <h1 className="font-editors-note text-4xl font-[500] text-[#1a1a1a] md:text-5xl">
          {title}
        </h1>
        <p className="font-inter max-w-md text-base font-[300] leading-[1.8] text-[#4a4a4a] md:text-lg">
          {message}
          {error && (
            <span className="mt-2 block font-mono text-xs text-red-400">
              Error: {error.message}
            </span>
          )}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 sm:flex-row">
        {reset && (
          <Button
            onClick={reset}
            size="lg"
            className="rounded-full bg-[#1a1a1a] px-8 py-6 font-inter text-xs font-[600] tracking-[2px] text-white uppercase hover:bg-[#333]"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}

        <Link href="/">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-[#1a1a1a] bg-transparent px-8 py-6 font-inter text-xs font-[600] tracking-[2px] text-[#1a1a1a] uppercase hover:bg-[#1a1a1a] hover:text-white"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
