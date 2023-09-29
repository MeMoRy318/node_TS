import { Router } from "express";

import { userController } from "../controllers";
import { commonMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.get("", userMiddleware.getAll, userController.getAll);
router.get(
  "/:id",
  commonMiddleware.isIdValid,
  userMiddleware.getById,
  userController.getById,
);
router.post(
  "",
  userMiddleware.isBodyValid,
  userMiddleware.findByEmailAndThrow,
  userController.create,
);
router.put(
  "/:id",
  commonMiddleware.isIdValid,
  userMiddleware.isUpdateBodyValid,
  userMiddleware.getById,
  userController.update,
);
router.delete(
  "/:id",
  commonMiddleware.isIdValid,
  userMiddleware.getById,
  userController.delete,
);

export { router as userRouter };
