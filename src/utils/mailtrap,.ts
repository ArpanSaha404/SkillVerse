import { MailtrapClient } from "mailtrap";
const nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
import dotenv from "dotenv";
import {
  coursePurchasedMailTemplate,
  resetPasswordMailTemplate,
  resetPasswordSuccessMailTemplate,
  verifyAccountMailTemplate,
  welcomeMailTemplate,
} from "./emailHtmls";

dotenv.config();

export const client = new MailtrapClient({
  token: process.env.API_TOKEN!,
});

export const sender = {
  email: "SkillVerse@demomailtrap.com",
  name: "SkillVerse Test",
};

export const verifyAccountMail = async (
  email: string,
  verificationCode: string
) => {
  const recipients = [{ email }];
  await client
    .send({
      from: sender,
      to: recipients,
      subject: "Verify your Skillverse Account",
      html: verifyAccountMailTemplate.replace(
        "{verificationToken}",
        verificationCode
      ),
      category: "Email Verification",
    })
    .then(console.log, console.error);
};

export const welcomeMail = async (email: string, name: string) => {
  const recipients = [{ email }];
  await client
    .send({
      from: sender,
      to: recipients,
      subject: "Wolcome to Skillverse",
      html: welcomeMailTemplate.replace("{name}", name),
      category: "Success Email",
    })
    .then(console.log, console.error);
  try {
  } catch (error) {
    console.log(error);
    throw new Error("Failed to Send Desired Mail...");
  }
};

export const resetPasswordMail = async (
  email: string,
  verificationCode: string
) => {
  const recipients = [{ email }];
  await client
    .send({
      from: sender,
      to: recipients,
      subject: "Reset your Skillverse Password",
      html: resetPasswordMailTemplate.replace(
        "{verificationToken}",
        verificationCode
      ),
      category: "Email Verification",
    })
    .then(console.log, console.error);
  try {
  } catch (error) {
    console.log(error);
    throw new Error("Failed to Send Desired Mail...");
  }
};

export const resetPasswordSuccessMail = async (email: string) => {
  const recipients = [{ email }];
  await client
    .send({
      from: sender,
      to: recipients,
      subject: "Your Skillverse Password reset Successfully",
      html: resetPasswordSuccessMailTemplate,
      category: "Email Verification",
    })
    .then(console.log, console.error);
  try {
  } catch (error) {
    console.log(error);
    throw new Error("Failed to Send Desired Mail...");
  }
};

export const coursePurchasedMail = async (
  email: string,
  name: string,
  courseName: string,
  price: string,
  paymentId: string,
  courseURL: string
) => {
  let updatedHTML: string = coursePurchasedMailTemplate;
  updatedHTML = updatedHTML.replace("{name}", name);
  updatedHTML = updatedHTML.replace("{courseName}", courseName);
  updatedHTML = updatedHTML.replace("{price}", price);
  updatedHTML = updatedHTML.replace("{paymentId}", paymentId);
  updatedHTML = updatedHTML.replace("{courseprogressURL}", courseURL);

  const recipients = [{ email }];
  await client
    .send({
      from: sender,
      to: recipients,
      subject: "Skillverse: Course Purchased",
      html: updatedHTML,
      category: "Email Verification",
    })
    .then(console.log, console.error);
  try {
  } catch (error) {
    console.log(error);
    throw new Error("Failed to Send Desired Mail...");
  }
};

// export const transport = Nodemailer.createTransport(
//   MailtrapTransport({
//     token: process.env.API_TOKEN!,
//   })
// );

// export const sender = {
//   address: "hello@demomailtrap.com",
//   name: "Mailtrap Test",
// };

// var transport = nodemailer.createTransport({
//   host: "live.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "smtp@mailtrap.io",
//     pass: process.env.API_TOKEN,
//   },
// });

// const mailOptions = {
//   from: "skillverse@demomailtrap.com",
//   to: "arpan50saha@gmail.com",
//   subject: "Testing",
//   text: "This is testing",
// };

// export const sendMailTest = async () => {
//   await transport.sendMail(mailOptions, (error: any, info: any) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(info.message + "asdefrg");
//     }
//   });
// };
