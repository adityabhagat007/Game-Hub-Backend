import nodemailer from "nodemailer";
import Config from "../config/config.js";
// create transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: Config.EMAIL,
    pass: Config.PASSWORD,
  },
});

export const sendMail = async (
  emailTo: string,
  subject: string,
  text?: string,
  html?: string,
  file?: string
) => {
  try {
    const defaultmailOption = {
      from: Config.EMAIL,
      to: emailTo,
      subject: subject,
      text: text,
      html: html,
    } as {
      from: string;
      to: string;
      subject: string;
      text: string;
      html: string;
    };
    let mailOption = {};
    if (file) {
      mailOption = {
        ...defaultmailOption,
        attachments: [
          {
            filename: "receipt",
            path: file,
          },
        ],
      };
    } else {
      mailOption = {
        ...defaultmailOption,
      };
    }

    const resp = await transporter.sendMail(mailOption);
    console.log(resp);
    return resp;
  } catch (err) {
    console.log(err);
  }
};
