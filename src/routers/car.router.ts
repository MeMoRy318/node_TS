import { Router } from "express";

import { carController } from "../controllers";
import { carMiddleware, commonMiddleware } from "../middlewares";
import { CarValidator } from "../validators";

const router = Router();
router.get("", carMiddleware.getAll, carController.getAll);
router.get(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.getById,
);
router.post(
  "",
  commonMiddleware.isBodyValid(CarValidator.create),
  carMiddleware.getByParamsAndThrow,
  carController.create,
);
router.put(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(CarValidator.update),
  carMiddleware.getByIdOrThrow,
  carController.update,
);
router.delete(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.delete,
);

export { router as carRouter };
