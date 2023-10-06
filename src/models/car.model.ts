import { model, Schema } from "mongoose";

import { ICar } from "../types";

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
  },
  { versionKey: false, timestamps: true },
);

const Car = model<ICar>("cars", schema);

export { Car };
