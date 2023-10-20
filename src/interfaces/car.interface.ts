import { Document } from "mongoose";

interface ICar extends Document {
  userId?: string;
  brand: string;
  price: number;
  year: number;
}

export type { ICar };
