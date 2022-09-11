import mongoose, { Types, Document } from "mongoose";

export interface CategoryDocument extends Document {
  _id: Types.ObjectId;
  name: string;
}

const CategorySchema = new mongoose.Schema<CategoryDocument>(
  {
    name: String,
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      versionKey: false,
    },
    toJSON: { virtuals: true },
  }
);

export default mongoose.model<CategoryDocument>(
  "Category",
  CategorySchema,
  "category"
);
