import { Router } from "express";

import { authController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();
router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.register),
  userMiddleware.getByParamsAndThrow,
  authController.register,
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.register),
  authMiddleware.getByEmailOrThrow,
  authMiddleware.passwordVerification,
  authController.login,
);
export { router as authRouter };
