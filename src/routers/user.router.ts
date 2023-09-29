import { Router } from "express";

import { userController } from "../controllers";
import { commonMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.get("", userMiddleware.getAll, userController.getAll);
router.post(
  "",
  userMiddleware.isBodyValid,
  userMiddleware.findByEmailAndThrow,
  userController.create,
);
router.get(
  "/:id",
  commonMiddleware.isIdValid,
  userMiddleware.getById,
  userController.getById,
);
router.delete(
  "/:id",
  commonMiddleware.isIdValid,
  userMiddleware.getById,
  userController.delete,
);

export { router as userRouter };
