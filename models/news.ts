import mongoose, { Types, Document } from "mongoose";

export interface NewsDocument extends Document {
  _id: Types.ObjectId;
  categoryId: Types.ObjectId;
  title: string;
  content: string;
  publisherId: Types.ObjectId;
  isDeleted: boolean;
}

const NewsSchema = new mongoose.Schema<NewsDocument>(
  {
    title: String,
    content: String,
    publisherId: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    isDeleted: { type: Boolean, default: false },
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

export default mongoose.model<NewsDocument>("News", NewsSchema, "news");
