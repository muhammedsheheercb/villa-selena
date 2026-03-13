import Contact from "@/app/contact/section/Contact";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Villa Selene Restaurant Abu Dhabi",
  description:
    "Get in touch with Villa Selene for reservations, enquiries, or to plan your visit to Yas Links Abu Dhabi.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Villa Selene | Mediterranean Restaurant",
    description:
      "Contact Villa Selene for bookings, special events, and information about our refined Mediterranean dining experience.",
    type: "website",
    locale: "en_GB",
    siteName: "Villa Selene",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Villa Selene | Yas Links Abu Dhabi",
    description:
      "Reach out to Villa Selene for reservations or enquiries and experience refined Mediterranean hospitality.",
  },
};

const page = ({}) => {
  return (
    <main className="relative flex h-full w-full">
      <div className="flex h-full w-full flex-col items-center justify-center bg-background">
        <Navbar position="absolute" />
        <Contact />
        <Footer />
      </div>
    </main>
  );
};

export default page;
