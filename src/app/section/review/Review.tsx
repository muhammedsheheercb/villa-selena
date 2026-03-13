import { FadeInUp, StaggerTextReveal } from "@/components/Animation";
import { ReviewsCarousel } from "./ReviewCarousal";
import { ReviewService } from "./ReviewService";

const Reviews = async () => {
  // const response = await ReviewService.getReviewData();
  // const review = response?.reviews;

  const review = ReviewService.getExampleReviews();

  return (
    <section className="relative w-full overflow-hidden bg-[#f6f1df] py-12 md:py-20 px-4 md:px-[150px]">
      {/* Background Pattern */}

      <div className="flex flex-col gap-6 md:gap-10">
        <div className="flex items-center justify-center">
          <StaggerTextReveal
            text="What They Say"
            className="font-editors-note text-center text-4xl font-[600] tracking-[5%] md:text-5xl justify-center"
          />
        </div>
        <FadeInUp delay={0.3} className="relative">
          {review && <ReviewsCarousel reviews={review} />}
        </FadeInUp>
      </div>
    </section>
  );
};

export default Reviews;
