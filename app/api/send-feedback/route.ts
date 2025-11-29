import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
interface FeedbackData {
  name: string;
  rating: number;
  quality: string;
  recommend: boolean;
  comments: string;
  submittedAt: string;
}
export async function POST(request: NextRequest) {
  try {
    const body: FeedbackData = await request.json();
    const { name, rating, quality, recommend, comments, submittedAt } = body;
    // Validate required fields
    if (!rating || !quality || !recommend) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    // Create transporter - Configure with your email provider
    // For Gmail, you need to enable "Less secure app access" or use App Passwords
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    // Generate star rating display
    const starRating = "★".repeat(rating) + "☆".repeat(5 - rating);
    // Email HTML template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Feedback Received</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); padding: 40px 40px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                        📬 New Feedback Received
                      </h1>
                      <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">
                        ${new Date(submittedAt).toLocaleString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <!-- Rating Section -->
                      <div style="background-color: #faf5ff; border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
                        <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">
                          Overall Rating
                        </p>
                        <p style="margin: 0; font-size: 36px; color: #eab308;">
                          ${starRating}
                        </p>
                        <p style="margin: 8px 0 0 0; font-size: 24px; font-weight: 700; color: #1f2937;">
                          ${rating} out of 5
                        </p>
                      </div>
                      
                      <!-- Details Grid -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                        <tr>
                          <td width="48%" style="background-color: #f0fdf4; border-radius: 12px; padding: 20px; vertical-align: top;">
                            <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">
                              Quality Rating
                            </p>
                            <p style="margin: 0; font-size: 18px; font-weight: 600; color: #166534;">
                              ${quality || "Not specified"}
                            </p>
                          </td>
                          <td width="4%"></td>
                          <td width="48%" style="background-color: ${
                            recommend ? "#f0fdf4" : "#fef2f2"
                          }; border-radius: 12px; padding: 20px; vertical-align: top;">
                            <p style="margin: 0 0 4px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">
                              Would Recommend
                            </p>
                            <p style="margin: 0; font-size: 18px; font-weight: 600; color: ${
                              recommend ? "#166534" : "#dc2626"
                            };">
                              ${recommend ? "✓ Yes" : "✗ No"}
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Comments Section -->
                      ${
                        comments
                          ? `
                      <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; border-left: 4px solid #8b5cf6;">
                        <p style="margin: 0 0 12px 0; font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px;">
                          Customer Comments
                        </p>
                        <p style="margin: 0; font-size: 16px; color: #374151; line-height: 1.6; font-style: italic;">
                          "${comments}"
                        </p>
                      </div>
                      `
                          : `
                      <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; text-align: center;">
                        <p style="margin: 0; font-size: 14px; color: #9ca3af;">
                          No additional comments provided
                        </p>
                      </div>
                      `
                      }
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                        This feedback was submitted through your website's feedback form.
                      </p>
                      <p style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af;">
                        © ${new Date().getFullYear()} Zylumine. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
    // Plain text version for email clients that don't support HTML
    const textContent = `
New Feedback Received
=====================
Submitted: ${new Date(submittedAt).toLocaleString()}
Rating: ${rating}/5 ${starRating}
Quality: ${quality || "Not specified"}
Would Recommend: ${recommend ? "Yes" : "No"}
Comments:
${comments || "No comments provided"}
---
This feedback was submitted through your website's feedback form.
    `;
    // Send email
    const mailOptions = {
      from: `"Feedback System" <${process.env.GMAIL_USER}>`,
      to: process.env.FEEDBACK_RECIPIENT_EMAIL || process.env.GMAIL_USER,
      subject: `⭐ New Feedback from ${name}: ${rating}/5 Stars`,
      text: textContent,
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      {
        success: true,
        message: "Feedback sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending feedback email:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to send feedback",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
