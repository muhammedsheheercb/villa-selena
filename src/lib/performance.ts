import type { Metric } from "web-vitals";

export const reportWebVitals = (metric: Metric) => {
  if (process.env.NODE_ENV === "production") {
    // Send to analytics service
    const body = JSON.stringify(metric);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", body);
    } else {
      fetch("/api/analytics", { body, method: "POST", keepalive: true });
    }
  }
};
