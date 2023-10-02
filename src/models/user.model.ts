import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 25,
    },
    age: {
      type: Number,
      min: 16,
      max: 99,
      required: true,
    },
    genders: {
      type: String,
      required: true,
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

const Person = model("person", schema);

export { Person };
