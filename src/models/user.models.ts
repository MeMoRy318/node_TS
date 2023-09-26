import { model, Schema } from "mongoose";

import { EGender } from "../types";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: [1, "Minimum age is 1"],
      max: [99, "Maximum age is 99"],
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: EGender,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);
const Person = model("person", schema);

export { Person };
