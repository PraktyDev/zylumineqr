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

    // Save guest to database
    const newGuest = new Guest({ email, name, code });
    await newGuest.save();

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject,
      //   html: `
      //     <div style="font-family: Arial; padding: 10px">
      //       <h3>${subject}</h3>
      //       <p>${message}</p>
      //     </div>
      //   `,
      html: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

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
