import { createTransport } from "nodemailer";
import { IEmailRequest } from "../interfaces/user.interfaces";
import AppError from "../errors/app.errors";
import Mailgen from "mailgen";

class EmailService {
  sendEmail = async ({ to, subject, text }: IEmailRequest) => {
    const transporter = createTransport({
      host: "smt.gmail.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter
      .sendMail({
        from: "envioemail678@gmail.com",
        to,
        subject,
        html: text,
      })
      .then(() => {
        console.log("Email send with sucess");
      })
      .catch((err) => {
        throw new AppError("Error sending email, try again later", 500);
      });
  };

  resetPasswordTemplate = (
    userName: string,
    userEmail: string,
    tokenResetPassword: string
  ) => {
    const mailGenerator = new Mailgen({
      theme: "cerberus",
      product: {
        name: "Kenzie",
        link: "http://localhost:3000",
      },
    });

    const email = {
      body: {
        name: userName,
        intro:
          "You have received this email because a password reset request for your account was received.",
        action: {
          instructions: "Copy the Token below to reset your password:",
          button: {
            color: "#DC4D2F",
            text: tokenResetPassword,
            link: "",
          },
        },
        outro:
          "If you did not request a password reset, no further action is required on your part.",
      },
    };

    const emailBody = mailGenerator.generate(email);
    const emailTemplate = {
      to: userEmail,
      subject: "Reset password",
      text: emailBody,
    };

    return emailTemplate;
  };
}

const emailService = new EmailService();

export { emailService };