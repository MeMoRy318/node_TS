import { model, Schema, Types } from "mongoose";

import { ICar } from "../interfaces";
import { Person } from "./user.model";

const carSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      max: 1000000,
      min: 1000,
      required: true,
    },
    year: {
      type: Number,
      max: new Date().getFullYear(),
      min: 1999,
    },
    userId: {
      type: Types.ObjectId,
      ref: Person,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Car = model<ICar>("cars", carSchema);

export { Car };
