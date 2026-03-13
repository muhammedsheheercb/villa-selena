import { z } from "zod";

export const ContactFormSchema = z.object({
  first: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." })
    .max(50, { message: "First name must not exceed 50 characters." })
    .regex(/^[a-zA-Z\s'-]+$/, {
      message:
        "First name can only contain letters, spaces, hyphens, and apostrophes.",
    })
    .refine((name) => name.trim().length > 0, {
      message: "First name cannot be empty or just spaces.",
    }),

  last: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." })
    .max(50, { message: "Last name must not exceed 50 characters." })
    .regex(/^[a-zA-Z\s'-]+$/, {
      message:
        "Last name can only contain letters, spaces, hyphens, and apostrophes.",
    })
    .refine((name) => name.trim().length > 0, {
      message: "Last name cannot be empty or just spaces.",
    }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." })
    .max(100, { message: "Email must not exceed 100 characters." }),

  phone: z
    .string()
    .min(1, { message: "Phone number is required." })
    .regex(/^\+?[\d\s()-]+$/, {
      message:
        "Phone number can only contain digits, spaces, parentheses, hyphens, and plus sign.",
    })
    .refine(
      (phone) => {
        const digitsOnly = phone.replace(/\D/g, "");
        return digitsOnly.length >= 10 && digitsOnly.length <= 15;
      },
      { message: "Phone number must contain between 10-15 digits." },
    ),

  message: z
    .string()
    .min(1, { message: "Message is required." })
    .max(5000, { message: "Message must not exceed 5000 characters." }),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;
