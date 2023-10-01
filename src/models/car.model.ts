import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    year: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    producer: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Car = model("cars", schema);

export { Car };
