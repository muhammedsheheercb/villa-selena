import type { Restaurant } from "@/types/restaurant";

interface ApiResponse {
  success: boolean;
  code: number;
  msg: string;
  data: Restaurant;
}
/**
 * Fetches restaurant data on the server
 * Usage: const restaurant = await getRestaurant();
 */
export async function getRestaurant(): Promise<Restaurant | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const restaurantId = process.env.NEXT_PUBLIC_RESTAURANT_ID;

  if (!apiUrl || !restaurantId) {
    return null;
  }

  try {
    const response = await fetch(`${apiUrl}/restaurant/${restaurantId}`, {
      next: { revalidate: 3600 },
    } as RequestInit);

    if (!response.ok) {
      return null;
    }

    const json: ApiResponse = await response.json();

    if (json.success && json.data) {
      return json.data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return null;
  }
}
