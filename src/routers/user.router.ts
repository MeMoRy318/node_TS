import { Router } from "express";

import { userController } from "../controllers";
import { commonMiddleware, userMiddleware } from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.get("", userMiddleware.getAll, userController.getAll);
router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.getById,
);
router.post(
  "",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.getByParamsAndThrow,
  userController.create,
);
router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.update),
  userMiddleware.getByIdOrThrow,
  userController.update,
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.delete,
);
export { router as userRouter };
