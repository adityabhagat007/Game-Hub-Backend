import { Router } from "express";
import { body } from "express-validator";
import { userSignup } from "../controllers/auth/authControllers";

const router = Router();

router.post(
  "/signup",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("username").not().isEmpty().withMessage("Username is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
  ],
  userSignup
);

export default router;
