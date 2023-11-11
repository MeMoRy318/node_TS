import { Router } from "express";

import { userController } from "../controllers";
import { IUser } from "../interfaces";
import {
  authMiddleware,
  commonMiddleware,
  managerMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.get(
  "",
  authMiddleware.checkAccessToken,
  managerMiddleware.isAdminOrManager,
  userController.getMany,
);

router.post(
  "",
  commonMiddleware.isBodyValid(UserValidator.create),
  authMiddleware.checkAccessToken,
  managerMiddleware.isAdminOrManager,
  userMiddleware.getByParamsAndThrow<IUser>("email"),
  userController.create,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.getById,
);

router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  authMiddleware.checkAccessToken,
  managerMiddleware.isAdminOrManager,
  userMiddleware.getByIdOrThrow,
  userController.update,
);

router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  authMiddleware.checkAccessToken,
  managerMiddleware.isAdminOrManager,
  userMiddleware.getByIdOrThrow,
  userController.delete,
);

export { router as userRouter };
