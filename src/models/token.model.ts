import { model, Schema, Types } from "mongoose";

import { IToken } from "../types";
import { Person } from "./user.model";

const schema = new Schema(
  {
    access: {
      type: String,
      required: true,
    },
    refresh: {
      type: String,
      required: true,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: Person,
    },
  },
  { versionKey: false, timestamps: true },
);

const Token = model<IToken>("tokens", schema);

export { Token };
