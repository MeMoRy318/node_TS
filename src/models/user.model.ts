import { model, Schema } from "mongoose";

import { IUser } from "../types";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
      min: 16,
      max: 99,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      toLowerCase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "inactive",
    },
  },
  { versionKey: false, timestamps: true },
);

const Person = model<IUser>("persons", userSchema);

export { Person };
