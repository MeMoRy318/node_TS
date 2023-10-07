import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();
router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.registerOrLogin),
  authMiddleware.getByParamsAndThrow,
  authController.register,
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.registerOrLogin),
  authMiddleware.getByParamsOrThrow,
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
export { router as authRouter };
