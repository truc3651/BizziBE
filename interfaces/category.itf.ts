import { Types } from "mongoose";
import { ListResult } from "./repository.itf";

export interface Category {
  id: string;
  _id: Types.ObjectId;
  name: string;
}

export interface ListCategories extends ListResult<Category> {}
