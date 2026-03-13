// utils/openingHours.ts
// Reusable utility functions for opening hours formatting

export interface DayTimings {
  isOpen: boolean;
  timings: Array<{ from: string; to: string }>;
  _id?: string;
}

export interface OpenHours {
  sunday?: DayTimings;
  monday?: DayTimings;
  tuesday?: DayTimings;
  wednesday?: DayTimings;
  thursday?: DayTimings;
  friday?: DayTimings;
  saturday?: DayTimings;
}

export interface GroupedHours {
  days: string[];
  daysDisplay: string;
  timings: string;
  isOpen: boolean;
}

/**
 * Groups opening hours by similar timings
 * @param openHours - Restaurant opening hours object
 * @returns Array of grouped hours with formatted display
 */
export const groupOpeningHours = (openHours?: OpenHours): GroupedHours[] => {
  if (!openHours) return [];

  const groups: Array<{ days: string[]; timings: string; isOpen: boolean }> =
    [];
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ] as const;
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as const;

  days.forEach((day, index) => {
    const dayData = openHours[day as keyof OpenHours];
    if (!dayData) return;

    const timingStr =
      dayData.isOpen && dayData.timings?.[0]
        ? `${dayData.timings[0].from} - ${dayData.timings[0].to}`
        : "Closed";

    const currentDayName = dayNames[index];
    if (!currentDayName) return; // Type guard

    // Check if we can group with previous entry
    const lastGroup = groups[groups.length - 1];
    if (
      lastGroup &&
      lastGroup.timings === timingStr &&
      lastGroup.isOpen === dayData.isOpen
    ) {
      lastGroup.days.push(currentDayName);
    } else {
      groups.push({
        days: [currentDayName],
        timings: timingStr,
        isOpen: dayData.isOpen,
      });
    }
  });

  // Format day ranges
  return groups.map((group) => {
    let daysDisplay: string;
    if (group.days.length === 1) {
      daysDisplay = group.days[0] || "";
    } else if (group.days.length === 7) {
      daysDisplay = "Every Day";
    } else {
      const firstDay = group.days[0] || "";
      const lastDay = group.days[group.days.length - 1] || "";
      daysDisplay = `${firstDay} - ${lastDay}`;
    }

    return {
      ...group,
      daysDisplay,
    };
  });
};

/**
 * Get all opening hours as individual days
 * @param openHours - Restaurant opening hours object
 * @returns Array of days with their timings
 */
export const getAllOpeningHours = (openHours?: OpenHours) => {
  if (!openHours) return [];

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ] as const;
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as const;

  return days.map((day, index) => {
    const dayData = openHours[day as keyof OpenHours];
    const timingDisplay =
      dayData?.isOpen && dayData?.timings?.[0]
        ? `${dayData.timings[0].from} - ${dayData.timings[0].to}`
        : "Closed";

    const currentDayName = dayNames[index];

    return {
      day: currentDayName || "",
      dayKey: day,
      isOpen: dayData?.isOpen || false,
      timings: dayData?.timings || [],
      timingDisplay,
    };
  });
};

/**
 * Check if restaurant is currently open
 * @param openHours - Restaurant opening hours object
 * @returns boolean indicating if restaurant is open now
 */
export const isRestaurantOpen = (openHours?: OpenHours): boolean => {
  if (!openHours) return false;

  const now = new Date();
  const dayIndex = now.getDay();
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ] as const;
  const currentDay = days[dayIndex];

  if (!currentDay) return false;

  const dayData = openHours[currentDay as keyof OpenHours];

  if (!dayData || !dayData.isOpen || !dayData.timings?.[0]) return false;

  const currentTime = now.getHours() * 60 + now.getMinutes();
  const { from, to } = dayData.timings[0];

  // Parse time strings with null checks
  const fromParts = from.split(":");
  const toParts = to.split(":");

  if (fromParts.length !== 2 || toParts.length !== 2) return false;

  const fromHours = parseInt(fromParts[0] || "0", 10);
  const fromMins = parseInt(fromParts[1] || "0", 10);
  const toHours = parseInt(toParts[0] || "0", 10);
  const toMins = parseInt(toParts[1] || "0", 10);

  if (isNaN(fromHours) || isNaN(fromMins) || isNaN(toHours) || isNaN(toMins))
    return false;
  const fromTime = fromHours * 60 + fromMins;
  const toTime = toHours * 60 + toMins;

  // Handle overnight hours (e.g., 8:00 PM to 2:00 AM)
  if (toTime < fromTime) {
    // If current time is after midnight
    if (currentTime < fromTime) {
      return currentTime <= toTime;
    }
    // If current time is before midnight
    return currentTime >= fromTime;
  }

  return currentTime >= fromTime && currentTime <= toTime;
};

/**
 * Get today's opening hours
 * @param openHours - Restaurant opening hours object
 * @returns Today's hours info
 */
export const getTodayHours = (openHours?: OpenHours) => {
  if (!openHours) return null;

  const now = new Date();
  const dayIndex = now.getDay();
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ] as const;
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as const;
  const currentDay = days[dayIndex];
  const dayName = dayNames[dayIndex];

  if (!currentDay || !dayName) return null;

  const dayData = openHours[currentDay as keyof OpenHours];

  if (!dayData) return null;

  const timingDisplay =
    dayData.isOpen && dayData.timings?.[0]
      ? `${dayData.timings[0].from} - ${dayData.timings[0].to}`
      : "Closed";

  return {
    day: dayName,
    isOpen: dayData.isOpen,
    timings: dayData.timings?.[0],
    timingDisplay,
  };
};

/**
 * Format time from 24h to 12h format
 * @param time - Time string in 24h format (e.g., "14:00")
 * @returns Formatted time in 12h format (e.g., "2:00 PM")
 */
export const formatTime12Hour = (time: string): string => {
  const parts = time.split(":");
  if (parts.length !== 2) return time; // Return original if invalid

  const hours = parseInt(parts[0] || "0", 10);
  const minutes = parseInt(parts[1] || "0", 10);

  if (isNaN(hours) || isNaN(minutes)) return time; // Return original if invalid

  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

/**
 * Get grouped hours with 12-hour format
 * @param openHours - Restaurant opening hours object
 * @returns Grouped hours with AM/PM format
 */
export const getGroupedHours12Format = (
  openHours?: OpenHours,
): GroupedHours[] => {
  if (!openHours) return [];

  const groups = groupOpeningHours(openHours);

  return groups.map((group) => ({
    ...group,
    timings:
      group.isOpen && group.timings !== "Closed"
        ? group.timings
            .split(" - ")
            .map((time) => formatTime12Hour(time))
            .join(" - ")
        : group.timings,
  }));
};
