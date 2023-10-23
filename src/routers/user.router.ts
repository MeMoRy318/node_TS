import { Router } from "express";

import { userController } from "../controllers";
import { IUser } from "../interfaces";
import {
  commonMiddleware,
  fileMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.get("", userController.getAll);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.getById,
);

router.post(
  "",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.getByParamsAndThrow<IUser>("email"),
  userController.create,
);

router.post(
  "/:userId/avatar",
  commonMiddleware.isIdValid("userId"),
  fileMiddleware.uploadFile,
  userController.uploadAvatar,
);

export { router as userRouter };
