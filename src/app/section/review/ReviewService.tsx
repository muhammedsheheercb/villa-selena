// ReviewService.ts
import { fetcher } from "@/lib/fetcher";
import { type Review } from "@/types/review.type";

const placeId = process.env.GOOGLE_RESTAURANT_PLACE_ID;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getReviewData = async () => {
  try {
    const data = await fetcher<{
      data: {
        placeId: string;
        reviews: Review[];
      };
    }>({
      endpoint: `${apiUrl}/restaurant-reviews/${placeId}`,
      options: {},
    });
    return data?.data?.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    // Return example data for design testing when API fails
    return {
      placeId: "example-place-id",
      reviews: getExampleReviews(),
    };
  }
};

// Example reviews for design testing
const getExampleReviews = (): Review[] => [
  {
    relativePublishTimeDescription: "2 days ago",
    authorAttribution: {
      displayName: "Amit Sharma",
      uri: "https://www.google.com/maps/contrib/123456789",
      photoUri: "/images/home/reviews/pictures/anna-mathew.svg",
    },
    text: {
      text: "Amazing food and great service. Highly recommended! The ambience was perfect for a family dinner. We loved every dish we ordered.",
    },
    rating: 5,
  },
  {
    relativePublishTimeDescription: "1 week ago",
    authorAttribution: {
      displayName: "Priya Nair",
      uri: "https://www.google.com/maps/contrib/234567890",
      photoUri: "/images/home/reviews/pictures/anna-mathew.svg",
    },
    text: {
      text: "The ambience was nice and the food was delicious. Will definitely come back again. Best restaurant in the area!",
    },
    rating: 5,
  },
  {
    relativePublishTimeDescription: "2 weeks ago",
    authorAttribution: {
      displayName: "Sneha Iyer",
      uri: "https://www.google.com/maps/contrib/345678901",
      photoUri: "/images/home/reviews/pictures/anna-mathew.svg",
    },
    text: {
      text: "Loved the flavors and presentation. Will visit again. Great value for money and excellent customer service.",
    },
    rating: 4,
  },
  {
    relativePublishTimeDescription: "1 month ago",
    authorAttribution: {
      displayName: "Vikram Singh",
      uri: "https://www.google.com/maps/contrib/456789012",
      photoUri: "/images/home/reviews/pictures/anna-mathew.svg",
    },
    text: {
      text: "Good value for money and friendly staff. The desserts were amazing! Must try their signature dishes.",
    },
    rating: 5,
  },
  {
    relativePublishTimeDescription: "2 months ago",
    authorAttribution: {
      displayName: "Neha Kapoor",
      uri: "https://www.google.com/maps/contrib/567890123",
      photoUri: "/images/home/reviews/pictures/anna-mathew.svg",
    },
    text: {
      text: "The desserts were the highlight of the meal. Must try their special cake! Perfect for celebrations.",
    },
    rating: 5,
  },
  {
    relativePublishTimeDescription: "3 months ago",
    authorAttribution: {
      displayName: "Kavya Reddy",
      uri: "https://www.google.com/maps/contrib/678901234",
      photoUri: "/images/home/reviews/pictures/anna-mathew.svg",
    },
    text: {
      text: "Excellent experience overall. Clean and well maintained. The staff was very attentive and helpful.",
    },
    rating: 4,
  },
];

export const ReviewService = {
  getReviewData,
  getExampleReviews,
};
