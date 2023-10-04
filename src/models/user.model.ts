import { model, Schema } from "mongoose";

import { IUser } from "../types";

const schema = new Schema(
  {
    name: {
      type: String,
      min: 3,
      max: 25,
    },
    age: {
      type: Number,
      min: 16,
      max: 99,
    },
    genders: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Person = model<IUser>("person", schema);

export { Person };
