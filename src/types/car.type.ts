import { Document } from "mongoose";

interface ICar extends Document {
  model: string;
  year: number;
  producer: string;
}

export type { ICar };
