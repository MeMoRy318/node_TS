import { Router } from "express";

import { userController } from "../controllers";
import { IUser } from "../interfaces";
import { commonMiddleware, userMiddleware } from "../middlewares";
import { QueryValidator, UserValidator } from "../validators";

const router = Router();

router.get(
  "",
  commonMiddleware.isQueryValid(QueryValidator.queryUsersPagination),
  userController.getAll,
);

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

export { router as userRouter };
