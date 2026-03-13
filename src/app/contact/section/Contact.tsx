import { getRestaurant } from "@/lib/getRestaurant";
import { groupOpeningHours } from "@/lib/openingHours";
import ContactClient from "./Contactclient";

export default async function Contact() {
  const restaurant = await getRestaurant();

  if (!restaurant) {
    return (
      <div className="flex h-screen w-full items-center justify-center px-8 py-12">
        <div className="text-center">
          <h1 className="font-editors-note mb-4 text-3xl font-[500] text-[#1a1a1a] uppercase">
            Unable to Load
          </h1>
          <p className="font-inter text-[#4a4a4a]">
            Failed to load restaurant data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const openingHoursGroups = groupOpeningHours(restaurant?.openHours);

  return (
    <ContactClient
      restaurant={restaurant}
      openingHoursGroups={openingHoursGroups}
    />
  );
}
