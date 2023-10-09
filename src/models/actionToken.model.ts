import { model, Schema, Types } from "mongoose";

import { EActionToken } from "../enums";
import { IActionToken } from "../types";
import { Person } from "./user.model";

const schema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    _userId: {
      type: Types.ObjectId,
      ref: Person,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: EActionToken,
    },
  },
  { versionKey: false, timestamps: true },
);

const ActionToken = model<IActionToken>("action-tokens", schema);

export { ActionToken };
