import express, { Request, Response, urlencoded } from "express";
import * as mongoose from "mongoose";

import { DB_URL, PORT } from "./configs";
import { EHttpStatus } from "./enums";
import { Person } from "./models";
import { IUser } from "./types";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.listen(PORT, async (): Promise<void> => {
  await mongoose.connect(DB_URL as string);
  console.log(`Server has successfully started on PORT ${PORT}  🚀🚀🚀`);
});

app.get("/users/:userId", async (req, res): Promise<void> => {
  try {
    const { userId } = req.params;
    const person = await Person.findById({ _id: userId });

    if (!person) throw new Error("Bad request");
    res.status(EHttpStatus.OK_200).json({ data: person });
  } catch (e) {
    res.status(EHttpStatus.BAD_REQUEST_400).json("Bed request");
  }
});

app.get("/users", async (req, res): Promise<void> => {
  try {
    const persons = await Person.find();
    if (!persons) throw new Error("Bad request");

    res.status(EHttpStatus.OK_200).json({ data: persons });
  } catch (e) {
    res.json("Bed request").status(EHttpStatus.BAD_REQUEST_400);
  }
});

app.post("/users", async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as IUser;
    if (!body) throw new Error("bed request");

    const person = await Person.create({ ...body });
    res.status(EHttpStatus.CREATED_201).json({ data: person });
  } catch (e) {
    res.status(EHttpStatus.BAD_REQUEST_400).json("bed request");
  }
});

app.put("/users/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const body = req.body as IUser;
    const person = await Person.findByIdAndUpdate(userId, body, {
      returnDocument: "after",
    });

    if (!person) throw new Error("Bad request");
    res.status(EHttpStatus.OK_200).json({ data: person });
  } catch (e) {
    res.status(EHttpStatus.BAD_REQUEST_400).json("Bed request");
  }
});

app.delete(
  "/users/:userId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const { deletedCount } = await Person.deleteOne({ _id: userId });

      if (!deletedCount) throw new Error("Not found");
      res.sendStatus(EHttpStatus.NO_CONTENT_204);
    } catch (e) {
      res.status(EHttpStatus.NOT_FOUND_404).json("Not found");
    }
  },
);
