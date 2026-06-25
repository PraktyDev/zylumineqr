import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import Guest from "@/models/Guest";
import { ConnectToDB } from "@/lib/connectToDB";

export async function POST(req: Request) {
  await ConnectToDB();
  try {
    const { email, subject, message, name, code } = await req.json();

    if (!email || !subject || !message || !name || !code) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if guest already exists
    let guest = await Guest.findOne({ email });

    if (guest && guest.emailSent) {
      return NextResponse.json(
        { error: "This email is already registered." },
        { status: 409 }
      );
    }

    if (!guest) {
      // First attempt — create the guest record (unsent)
      guest = new Guest({ email, name, code, emailSent: false });
      await guest.save();
    } else {
      // Retry attempt — update name/code in case they changed
      guest.name = name;
      // guest.code = code;
      await guest.save();
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);

    // Mark email as sent only after success
    guest.emailSent = true;
    await guest.save();

    return NextResponse.json({
      success: true,
      message: "Guest Registered and Email sent!",
    });
  } catch (error) {
    console.error("REGISTRATION AND MAIL ERROR:", error);
    return NextResponse.json(
      { error: "Failed to register and send email" },
      { status: 500 }
    );
  }
}