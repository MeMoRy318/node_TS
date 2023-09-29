import { model, Schema } from "mongoose";

import { EGender } from "../types";

const schema = new Schema(
  {
    name: {
      type: String,
      maxLength: 25,
      minLength: 2,
      trim: true,
    },
    age: {
      type: Number,
      max: 99,
      min: 16,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    genders: {
      type: String,
      enum: EGender,
    },
  },
  { timestamps: true, versionKey: false },
);

const Person = model("person", schema);

export { Person };
