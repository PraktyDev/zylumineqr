import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { to, subject, message } = await req.json();

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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
      to,
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

    return NextResponse.json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
