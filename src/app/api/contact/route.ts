import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ContactFormSchema } from "@/lib/validations/contact";

// Sanitize inputs (basic XSS prevention)
const sanitize = (str: string) => str.replace(/[<>]/g, "").trim();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate with Zod
    const validationResult = ContactFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 },
      );
    }

    const { first, last, email, phone, message } = validationResult.data;

    // Sanitize all inputs
    const sanitizedData = {
      first: sanitize(first),
      last: sanitize(last),
      email: sanitize(email),
      phone: sanitize(phone),
      message: sanitize(message),
    };

    const smtpOptions = {
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    };

    const transporter = nodemailer.createTransport(smtpOptions);

    const mailOptions = {
      from: `${process.env.EMAIL_FROM_PREFIX} Contact <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: "New Contact Form Submission",
      text: `
New Contact Form Submission:

Name: ${sanitizedData.first} ${sanitizedData.last}
Email: ${sanitizedData.email}
Phone: ${sanitizedData.phone}

Message:
${sanitizedData.message}
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #B68F62; color: #fff; padding: 20px; text-align: center; }
    .content { padding: 20px; background-color: #f9f9f9; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .message-box { background-color: #fff; padding: 15px; border-left: 4px solid #B68F62; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">Name:</span> ${sanitizedData.first} ${sanitizedData.last}
      </div>
      <div class="field">
        <span class="label">Email:</span> <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a>
      </div>
      <div class="field">
        <span class="label">Phone:</span> <a href="tel:${sanitizedData.phone}">${sanitizedData.phone}</a>
      </div>
      <div class="field">
        <span class="label">Message:</span>
        <div class="message-box">${sanitizedData.message.replace(/\n/g, "<br>")}</div>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Form Submitted" }, { status: 200 });
  } catch (error) {
    console.error("Form error:", error);
    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 },
    );
  }
}
