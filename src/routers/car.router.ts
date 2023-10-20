import { Router } from "express";

import { carController } from "../controllers";
import { authMiddleware, commonMiddleware } from "../middlewares";
import { CarValidator, QueryValidator } from "../validators";

const router = Router();

router.post(
  "",
  commonMiddleware.isBodyValid(CarValidator.create),
  authMiddleware.checkAccessToken,
  carController.create,
);

router.get(
  "",
  commonMiddleware.isQueryValid(QueryValidator.queryBasePagination),
  authMiddleware.checkAccessToken,
  carController.getAll,
);

export { router as carRouter };
