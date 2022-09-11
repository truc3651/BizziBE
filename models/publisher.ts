import mongoose, { Types, Document } from "mongoose";

export interface PublisherDocument extends Document {
  _id: Types.ObjectId;
  fullname: string;
  email: string;
  accessSecretKey: string;
  passwordSalt: string;
  passwordHashed: string;
}

const PublisherSchema = new mongoose.Schema<PublisherDocument>(
  {
    fullname: String,
    email: String,
    accessSecretKey: String,
    passwordSalt: String,
    passwordHashed: String,
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

export default mongoose.model<PublisherDocument>(
  "Publisher",
  PublisherSchema,
  "publisher"
);
