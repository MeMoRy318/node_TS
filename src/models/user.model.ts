import { model, Schema } from "mongoose";

import { EGender } from "../types";

const schema = new Schema(
  {
    name: {
      type: String,
      maxLength: 25,
      trim: true,
    },
    age: {
      type: Number,
      max: 99,
      min: 16,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    genders: {
      type: String,
      enum: EGender,
    },
  },
  { versionKey: false, timestamps: true },
);

const Person = model("person", schema);

export { Person };
