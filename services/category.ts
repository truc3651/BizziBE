import { ListPayload } from "../interfaces/repository.itf";
import BaseService from "./BaseService";
import CategoryModel, { CategoryDocument } from "../models/category";
import { Types } from "mongoose";

export default class CategoryService extends BaseService<CategoryDocument> {
  constructor() {
    super(CategoryModel);
  }

  public async listCategories(args: ListPayload) {
    return this.list({
      select: "id name",
      ...args,
    });
  }

  public getCategory(id: Types.ObjectId) {
    return this.find({
      _id: id,
    });
  }
}
