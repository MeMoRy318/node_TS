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
  commonMiddleware.isBodyValid(UserValidator.registerOrLogin),
  userMiddleware.getByParamsAndThrow,
  authController.register,
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.registerOrLogin),
  userMiddleware.getByParamsOrThrow,
  authMiddleware.passwordVerification,
  authController.login,
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);
router.post(
  "/forgot",
  commonMiddleware.isBodyValid(UserValidator.forgot),
  userMiddleware.getByParamsOrThrow,
  authController.forgot,
);
router.patch(
  "/forgot",
  commonMiddleware.isBodyValid(UserValidator.forgot_password),
  authMiddleware.checkActionToken("forgot"),
  authController.forgotPassword,
);
export { router as authRouter };
