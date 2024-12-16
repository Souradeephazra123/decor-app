import nodemailer from "nodemailer";
import { type NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, link } = await req.json();

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Verify the transporter configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error("Transporter verification failed:", error);
      } else {
        console.log("Transporter is ready to send emails");
      }
    });

    // Email options
    //siteIncharge email
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Please have a look for bidding",
      html: `
            <p>Dear Buyer,</p>
            <p>Please visit this page for bidding</p>
            <a href="${link}">${link}</a>
            <p>- Decorations</p>
          `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
};
