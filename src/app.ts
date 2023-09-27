import express, { NextFunction, Request, Response, urlencoded } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs";
import { EHttpStatus } from "./enums";
import { Person } from "./models";
import { IUser } from "./types";
import { ApiError } from "./utility";
import { UserValidator } from "./validators";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await Person.find();
    if (!users.length) {
      throw new ApiError("not found", EHttpStatus.NOT_FOUND_404);
    }
    res.status(EHttpStatus.OK_200).json({ data: users });
  } catch (e) {
    next(e);
  }
});

app.get(
  "/users/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;

      if (!mongoose.isObjectIdOrHexString(userId)) {
        throw new ApiError("ID not valid", EHttpStatus.BAD_REQUEST_400);
      }
      const person = await Person.findById(userId);
      if (!person) throw new ApiError("Not found", EHttpStatus.NOT_FOUND_404);
      res.status(EHttpStatus.OK_200).json({ data: person });
    } catch (e) {
      next(e);
    }
  },
);

app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body as IUser;
    const { value, error } = UserValidator.createUser.validate(user);
    if (error) {
      throw new ApiError(error.message, EHttpStatus.BAD_REQUEST_400);
    }
    const createdUser = await Person.create({ ...value });
    res.status(EHttpStatus.CREATED_201).json({ data: createdUser });
  } catch (e) {
    next(e);
  }
});

app.put(
  "/users/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      if (!mongoose.isObjectIdOrHexString(userId)) {
        throw new ApiError("ID not valid", EHttpStatus.BAD_REQUEST_400);
      }
      const body = req.body as IUser;
      const { value, error } = UserValidator.updateUser.validate(body);
      if (error) throw new ApiError(error.message, EHttpStatus.BAD_REQUEST_400);
      const user = await Person.findByIdAndUpdate(userId, value, {
        returnDocument: "after",
      });
      if (!user) throw new ApiError("Not found", EHttpStatus.NOT_FOUND_404);
      res.status(EHttpStatus.CREATED_201).json({ data: user });
    } catch (e) {
      next(e);
    }
  },
);

app.delete(
  "/users/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      if (!mongoose.isObjectIdOrHexString(userId)) {
        throw new ApiError("ID not valid", EHttpStatus.BAD_REQUEST_400);
      }
      const { deletedCount } = await Person.deleteOne({ _id: userId });
      if (!deletedCount) {
        throw new ApiError("Not found", EHttpStatus.NOT_FOUND_404);
      }
      res.sendStatus(EHttpStatus.NO_CONTENT_204);
    } catch (e) {
      next(e);
    }
  },
);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json(err.message);
});

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);

  console.log(
    `Server has successfully started on PORT ${configs.PORT}  🚀🚀🚀`,
  );
});
