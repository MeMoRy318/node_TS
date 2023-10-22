import { Router } from "express";

import { userController } from "../controllers";
import { IUser } from "../interfaces";
import { commonMiddleware, userMiddleware } from "../middlewares";
import { fileMiddleware } from "../middlewares/file.middleware";
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
  fileMiddleware.isFileValid,
  userController.uploadAvatar,
);

export { router as userRouter };
