import SignaturesCarousel from "./SignaturesCarousel";
import type { ApiResponse, SignatureModel } from "./types";

const API_URL =
  "https://api.staging.sdk.thefoodo.com/model/all?restaurantID=69898acd563ca48e10d036ee";
const API_KEY = "YX359UOkq04TEBKA04KGK73JXP4H63UJVQZYAUKEWS";
const RESTAURANT_ID = "69898acd563ca48e10d036ee";

function formatModelName(slug: string): string {
  return slug
    .replace(/^-+|-+$/g, "")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function fetchSignatureModels(): Promise<SignatureModel[]> {
  try {
    const res = await fetch(API_URL, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      console.error(`Signatures API error: ${res.status}`);
      return [];
    }

    const json = (await res.json()) as ApiResponse;

    if (!json.success || !json.data?.rows) return [];

    return json.data.rows
      .filter(
        (row) =>
          row.status === 4 &&
          row.meta.restaurantID === RESTAURANT_ID &&
          row.modelPath?.glb,
      )
      .map((row) => ({
        name: row.name,
        displayName: formatModelName(row.name),
        glbUrl: row.modelPath!.glb!,
        price: 0,
      }));
  } catch (err) {
    console.error("Failed to fetch signature models:", err);
    return [];
  }
}

const Signatures = async () => {
  const models = await fetchSignatureModels();

  if (models.length === 0) return null;

  return <SignaturesCarousel models={models} />;
};

export default Signatures;
