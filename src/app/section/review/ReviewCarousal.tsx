"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { Star } from "lucide-react";

interface Review {
  rating: number;
  text: { text: string };
  authorAttribution: {
    displayName: string;
    photoUri: string;
  };
  relativePublishTimeDescription: string;
}

interface ReviewsCarouselProps {
  reviews: Review[];
}

const ReviewsCarousel = ({ reviews }: ReviewsCarouselProps) => {
  const [expandedReviews, setExpandedReviews] = useState(new Set<number>());

  const toggleReadMore = (index: number) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedReviews(newExpanded);
  };

  const isTextTruncated = (text: string) => {
    return text && text.length > 120;
  };

  return (
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {reviews
            .filter((review) => review.rating >= 4)
            .map((review, index) => {
              const isExpanded = expandedReviews.has(index);
              const needsReadMore = isTextTruncated(review.text.text);

              return (
                <CarouselItem
                  key={index}
                  className="basis-full pl-2 md:basis-1/3 md:pl-4"
                >
                  <div className="p-1">
                    <Card className="border-background bg-background shadow-lg rounded-xl">
                      <CardContent className="flex min-h-[300px] flex-col gap-6 p-6 sm:p-8">
                        {/* Rating Stars */}
                        <div className="flex justify-start gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-current" />
                          ))}
                        </div>

                        {/* Review Text */}
                        <div className="flex flex-1 flex-col justify-start">
                          <p
                            className={`font-inter text-sm leading-relaxed transition-all duration-300 sm:text-base ${
                              isExpanded ? "" : "line-clamp-3"
                            }`}
                          >
                            {review.text.text}
                          </p>

                          {needsReadMore && (
                            <button
                              onClick={() => toggleReadMore(index)}
                              className="w-fit mt-3 text-xs font-inter font-medium transition-colors duration-200 hover:text-yellow-300"
                            >
                              {isExpanded ? "Read Less" : "Read More"}
                            </button>
                          )}
                        </div>

                        {/* Author Info */}
                        <div className="flex flex-col items-start">
                          {/* <div className="relative">
                            <div className="h-12 w-12">
                              <Image
                                src={review.authorAttribution.photoUri}
                                alt={`${review.authorAttribution.displayName} profile`}
                                width={48}
                                height={48}
                                className="h-full w-full rounded-full bg-gray-800 object-cover"
                                onError={(e) => {
                                  // Fallback to initials if image fails
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.innerHTML = `
                                      <div class="w-full h-full rounded-full bg-[#FBEAD2] flex items-center justify-center text-black font-bold text-lg">
                                        ${review.authorAttribution.displayName.charAt(0)}
                                      </div>
                                    `;
                                  }
                                }}
                              />
                            </div>
                          </div> */}

                          <div>
                            <p className="font-inter text-sm font-semibold sm:text-base">
                              {review.authorAttribution.displayName}
                            </p>
                            <p className="font-inter text-xs sm:text-sm">
                              {review.relativePublishTimeDescription}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>

        {/* Navigation Arrows */}
        <div className="mt-8 flex justify-center gap-4">
          <CarouselPrevious className="static h-10 w-10 translate-y-0 rounded-full border-none bg-[#FFFCF9] text-black shadow-lg transition-all hover:scale-110 hover:from-amber-500 hover:to-yellow-400" />
          <CarouselNext className="static h-10 w-10 translate-y-0 rounded-full border-none bg-[#FFFCF9] text-black shadow-lg transition-all hover:scale-110 hover:from-amber-500 hover:to-yellow-400" />
        </div>
      </Carousel>
    </div>
  );
};

export { ReviewsCarousel };
