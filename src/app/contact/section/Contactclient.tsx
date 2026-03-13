"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Check, AlertCircle, Phone, MapPin, Clock, Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  ContactFormSchema,
  type ContactFormData,
} from "@/lib/validations/contact";
import type { Restaurant } from "@/types/restaurant";
import { FadeInUp, StaggerTextReveal } from "@/components/Animation";

interface OpeningHoursGroup {
  daysDisplay: string;
  timings: string;
  isOpen: boolean;
}

interface ContactClientProps {
  restaurant: Restaurant;
  openingHoursGroups: OpeningHoursGroup[];
}

const ContactClient: React.FC<ContactClientProps> = ({
  restaurant,
  openingHoursGroups,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const latitude = restaurant?.address?.coords?.[0];
  const longitude = restaurant?.address?.coords?.[1];
  const address = `${restaurant?.name} ${restaurant?.address?.firstLine} ${restaurant?.address?.city} ${restaurant?.address.postCode}`;
  const placeQuery = `${restaurant?.name} ${restaurant?.address?.firstLine} ${restaurant?.address?.city} ${restaurant?.address.postCode}`;

  const mapLink =
    latitude && longitude
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeQuery)}`
      : `https://www.google.com/maps?q=${latitude},${longitude}`;

  const mapEmbedUrl =
    latitude && longitude
      ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`
      : `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      first: "",
      last: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const bookTableMutation = useMutation({
    mutationFn: async (values: ContactFormData) => {
      return await axios.post("/api/contact", values);
    },
    onSuccess: () => {
      setModalType("success");
      setShowModal(true);
    },
    onError: () => {
      setModalType("error");
      setShowModal(true);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    bookTableMutation.mutate(data);
  };

  return (
    <section className="relative h-full w-full py-12 md:py-24 bg-background">
      <div className="flex h-full w-full flex-col items-center justify-center gap-16 px-4 md:px-[100px] lg:px-[150px]">
        {/* Header Section */}
        <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
          <FadeInUp>
            <span className="font-inter text-xs font-[500] tracking-[2px] text-[#888888] uppercase">
              Get In Touch
            </span>
          </FadeInUp>
          <StaggerTextReveal
            text="Contact Us"
            className="text-5xl font-[300] font-canela text-[#1a1a1a] md:text-7xl justify-center leading-tight tracking-tight"
          />
        </div>

        {/* Main Content */}
        <div className="flex w-full flex-col gap-12 lg:flex-row lg:gap-20">
          {/* Left Side - Contact Information */}
          <div className="flex w-full flex-col gap-8 lg:w-1/2">
            <FadeInUp delay={0.2} className="space-y-6">
              <h2 className="font-canela text-3xl font-[300] text-[#1a1a1a] tracking-tight">
                Visit Our Restaurant
              </h2>
              <p className="font-inter max-w-[500px] text-base font-[300] leading-[1.8] text-[#4a4a4a]">
                {restaurant?.description}
              </p>
            </FadeInUp>

            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Phone */}
              <FadeInUp delay={0.3} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f4f4] text-[#1a1a1a]">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-inter text-xs font-[600] tracking-[1px] text-[#888888] uppercase mb-1">
                    Phone
                  </h3>
                  <Link
                    href={`tel:${restaurant?.contactNumber}`}
                    className="font-inter text-lg text-[#1a1a1a] hover:text-[#000] transition-colors"
                  >
                    {restaurant?.contactNumber}
                  </Link>
                </div>
              </FadeInUp>

              {/* Email */}
              <FadeInUp delay={0.4} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f4f4] text-[#1a1a1a]">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-inter text-xs font-[600] tracking-[1px] text-[#888888] uppercase mb-1">
                    Email
                  </h3>
                  <Link
                    href={`mailto:${restaurant?.email}`}
                    className="font-inter text-lg text-[#1a1a1a] hover:text-[#000] transition-colors"
                  >
                    {restaurant?.email ?? ""}
                  </Link>
                </div>
              </FadeInUp>

              {/* Location */}
              <FadeInUp delay={0.5} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f4f4] text-[#1a1a1a]">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-inter text-xs font-[600] tracking-[1px] text-[#888888] uppercase mb-1">
                    Location
                  </h3>
                  <Link
                    target="_blank"
                    href={mapLink ?? "https://share.google/qyjN4HvpzX2U6iCp1"}
                    className="font-inter text-base text-[#1a1a1a] leading-relaxed hover:text-[#000] transition-colors"
                  >
                    {restaurant?.address.firstLine},{" "}
                    {restaurant?.address.secondLine}
                    <br />
                    {restaurant?.address.city} {restaurant?.address.postCode}
                  </Link>
                </div>
              </FadeInUp>

              {/* Hours */}
              <FadeInUp delay={0.6} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f4f4] text-[#1a1a1a]">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="flex w-full flex-col gap-4">
                  <h3 className="font-inter text-xs font-[600] tracking-[1px] text-[#888888] uppercase">
                    Opening Hours
                  </h3>
                  <div className="flex flex-col gap-2 w-full max-w-sm">
                    {openingHoursGroups.map((group, index) => (
                      <div
                        key={index}
                        className="flex w-full items-center justify-between border-b border-[#eee] pb-2 last:border-0 last:pb-0"
                      >
                        <span className="font-inter text-sm font-[400] text-[#1a1a1a]">
                          {group.daysDisplay}
                        </span>
                        <span className="font-inter text-sm font-[500] text-[#1a1a1a]">
                          {group.isOpen ? group.timings : "Closed"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="flex w-full flex-col lg:w-1/2">
            <FadeInUp
              delay={0.3}
              className="rounded-[2rem] bg-[#FAFAFA] border border-[#f0f0f0] p-8 md:p-12 shadow-2xl shadow-gray-100"
            >
              <div className="mb-8">
                <h2 className="font-canela text-2xl font-[300] text-[#1a1a1a]">
                  Send a Message
                </h2>
                <p className="mt-2 font-inter text-sm font-[300] text-[#666] leading-relaxed">
                  We`d love to hear from you. Fill out the form below and we`ll
                  be in touch.
                </p>
              </div>

              {isMounted ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="first"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="First Name"
                                {...field}
                                className="h-12 rounded-lg border border-[#e5e5e5] bg-white px-4 text-[#1a1a1a] placeholder:text-[#999] focus-visible:border-[#1a1a1a] focus-visible:ring-0 transition-colors"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 font-inter text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="last"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Last Name"
                                {...field}
                                className="h-12 rounded-lg border border-[#e5e5e5] bg-white px-4 text-[#1a1a1a] placeholder:text-[#999] focus-visible:border-[#1a1a1a] focus-visible:ring-0 transition-colors"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 font-inter text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email Address"
                              type="email"
                              {...field}
                              className="h-12 rounded-lg border border-[#e5e5e5] bg-white px-4 text-[#1a1a1a] placeholder:text-[#999] focus-visible:border-[#1a1a1a] focus-visible:ring-0 transition-colors"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 font-inter text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Phone Number"
                              type="tel"
                              {...field}
                              className="h-12 rounded-lg border border-[#e5e5e5] bg-white px-4 text-[#1a1a1a] placeholder:text-[#999] focus-visible:border-[#1a1a1a] focus-visible:ring-0 transition-colors"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 font-inter text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Your Message"
                              {...field}
                              className="min-h-[150px] resize-none rounded-lg border border-[#e5e5e5] bg-white p-4 text-[#1a1a1a] placeholder:text-[#999] focus-visible:border-[#1a1a1a] focus-visible:ring-0 transition-colors"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 font-inter text-xs" />
                        </FormItem>
                      )}
                    />

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={bookTableMutation.isPending}
                        className="w-full rounded-full bg-[#1a1a1a] py-6 font-inter text-xs font-[600] tracking-[2px] text-white uppercase hover:bg-[#333] transition-colors disabled:opacity-50"
                      >
                        {bookTableMutation.isPending
                          ? "Sending..."
                          : "Send Message"}
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="h-12 animate-pulse rounded-lg bg-[#e5e5e5]" />
                    <div className="h-12 animate-pulse rounded-lg bg-[#e5e5e5]" />
                  </div>
                  <div className="h-12 animate-pulse rounded-lg bg-[#e5e5e5]" />
                  <div className="h-12 animate-pulse rounded-lg bg-[#e5e5e5]" />
                  <div className="h-[150px] animate-pulse rounded-lg bg-[#e5e5e5]" />
                  <div className="h-12 animate-pulse rounded-full bg-[#e5e5e5]" />
                </div>
              )}
            </FadeInUp>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full">
          <FadeInUp delay={0.4} className="mb-8 text-center">
            <h2 className="font-canela mt-2 text-2xl font-[300] text-[#1a1a1a] md:text-3xl tracking-tight">
              Find Our Location
            </h2>
          </FadeInUp>
          <FadeInUp
            delay={0.5}
            className="overflow-hidden rounded-[2rem] border border-[#e5e5e5] shadow-xl"
          >
            <iframe
              src={mapEmbedUrl}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[400px] w-full grayscale-[0%] contrast-[1] hue-rotate-0"
            />
          </FadeInUp>
        </div>
      </div>

      {/* Success/Error Modal */}
      {isMounted && showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              {modalType === "success" ? (
                <>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-canela mb-4 text-2xl font-[300] text-[#1a1a1a]">
                    Message Sent
                  </h3>
                  <p className="font-inter mb-8 font-[300] text-[#4a4a4a] leading-relaxed">
                    Thank you for contacting us. We`ll get back to you shortly.
                  </p>
                  <div className="flex gap-4 w-full">
                    <Button
                      onClick={() => {
                        setShowModal(false);
                        form.reset();
                      }}
                      className="w-full rounded-full bg-[#1a1a1a] py-6 font-inter text-xs font-[600] tracking-[1px] text-white uppercase hover:bg-[#333]"
                    >
                      Done
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="font-canela mb-4 text-xl font-[300] text-[#1a1a1a]">
                    Something Went Wrong
                  </h3>
                  <p className="font-inter mb-8 font-[300] text-[#4a4a4a] leading-relaxed">
                    We couldn&apos;t send your message. Please try again or call
                    us directly.
                  </p>
                  <div className="flex gap-4 w-full">
                    <Button
                      onClick={() => setShowModal(false)}
                      className="w-full rounded-full bg-red-600 py-6 font-inter text-xs font-[600] tracking-[1px] text-white uppercase hover:bg-red-700"
                    >
                      Try Again
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowModal(false)}
                      className="w-full rounded-full border-[#e5e5e5] bg-transparent py-6 font-inter text-xs font-[600] tracking-[1px] text-[#1a1a1a] uppercase hover:bg-[#f9f9f9]"
                    >
                      Close
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactClient;
