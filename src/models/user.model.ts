import { model, Schema } from "mongoose";

import { regexConstant } from "../constans";
import { IUser } from "../interfaces";

const personSchema = new Schema(
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
    status: {
      type: String,
      default: "inactive",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: regexConstant.EMAIL,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

const Person = model<IUser>("persons", personSchema);

export { Person };
