import { Document } from "mongoose";

interface ICar extends Document {
  year: number;
  model: string;
  producer: string;
}

export type { ICar };
