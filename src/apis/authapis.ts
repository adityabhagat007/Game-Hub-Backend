import { Router } from "express";
import { body } from "express-validator";
import { userSignup } from "../controllers/auth/authControllers";

const router = Router();

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").isStrongPassword().withMessage("Password is required"),
  ],
  userSignup
);

export default router;
