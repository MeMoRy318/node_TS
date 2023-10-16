import { Router } from "express";

import { authController } from "../controllers";
import { EToken } from "../enums";
import { IUser } from "../interfaces";
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
  userMiddleware.getByParamsAndThrow<IUser>("email"),
  authController.register,
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.registerOrLogin),
  userMiddleware.getByParamsOrThrow<IUser>("email"),
  authMiddleware.passwordVerification,
  authController.login,
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

router.post("/logout", authMiddleware.checkAccessToken, authController.logout);

router.post(
  "/logout-all",
  authMiddleware.checkAccessToken,
  authController.logoutAll,
);
router.post(
  "/activate/:active",
  authMiddleware.checkActionToken(EToken.ACTIVE),
  authController.activate,
);
router.post(
  "/forgot",
  commonMiddleware.isBodyValid(UserValidator.forgotMailVerify),
  userMiddleware.getByParamsOrThrow<IUser>("email"),
  authController.forgot,
);

router.patch(
  "/forgot/:forgot",
  commonMiddleware.isBodyValid(UserValidator.forgotPasswordVerify),
  authMiddleware.checkActionToken(EToken.FORGOT),
  authController.forgotPassword,
);

router.patch(
  "/password",
  commonMiddleware.isBodyValid(UserValidator.setNewPassword),
  authMiddleware.checkAccessToken,
  authMiddleware.passwordVerification,
  authController.setNewPassword,
);
export { router as authRouter };
