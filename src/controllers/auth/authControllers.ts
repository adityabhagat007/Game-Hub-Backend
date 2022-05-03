import { RequestHandler } from "express";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import genOtp from "../../utils/gen-OTP";
import { sendMail } from "../../utils/sendmail";

const { user } = new PrismaClient();

interface signupObj {
  name: string;
  username: string;
  email: string;
  password: string;
  number: string;
  otp: string;
}

export const userSignup: RequestHandler = async (req, res, next) => {
  try {
    const { name, username, password, email, number } = req.body as signupObj;
    const sameUsername = await user.findUnique({
      where: { username: username },
    });
    if (sameUsername) {
      return res.status(400).json({
        status: false,
        message: "Username already taken",
        data: "",
      });
    }
    const sameEmail = await user.findUnique({ where: { email: email } });
    if (sameEmail) {
      return res.status(400).json({
        status: false,
        message: "Email is already register",
        data: "",
      });
    }

    const body = {} as signupObj;
    body.name = name;
    body.username = username;
    const hashPassword = await bcryptjs.hash(password, 12);
    body.password = hashPassword;
    body.email = email;
    body.number = number;

    const otp: string = genOtp();
    const dateInstance = new Date();
    dateInstance.setMinutes(dateInstance.getMinutes() + 30);
    body.otp = otp;
    const sendEmail = await sendMail(
      email,
      "Signup OTP",
      "",
      `<h1>${otp}</h1>`,
      ""
    );
    if (!sendEmail) {
      return res.status(500).json({
        status: false,
        message: "Error sending email",
        data: "",
      });
    }

    const userCreation = await user.create({
      data: {
        name,
        username,
        password: hashPassword,
        email,
        number,
        otp,
        expTime: dateInstance,
      },
    });

    res.status(200).json({
      status: false,
      message: "Please check your email for OTP",
      data: userCreation,
    });
  } catch (err) {
    next(err);
  }
};
