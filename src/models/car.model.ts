import { model, Schema, Types } from "mongoose";

import { ICar } from "../interfaces";
import { Person } from "./user.model";

const schema = new Schema(
  {
    model: {
      type: String,
    },
    year: {
      type: String,
    },
    producer: {
      type: String,
    },
    price: {
      type: Number,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: Person,
    },
    status: {
      type: String,
      default: "inactive",
    },
  },
  { versionKey: false, timestamps: true },
);

const Car = model<ICar>("cars", schema);

export { Car };
