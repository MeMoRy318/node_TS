import { model, Schema, Types } from "mongoose";

import { IActionToken } from "../interfaces";
import { Person } from "./user.model";

const tokensSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    _userId: {
      type: Types.ObjectId,
      required: true,
      ref: Person,
    },
  },
  { timestamps: true, versionKey: false },
);

export const ActionToken = model<IActionToken>("action-token", tokensSchema);
