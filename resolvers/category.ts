import CategoryService from "../services/category";
import { ListPayload } from "../interfaces/repository.interface";

const categoryService = new CategoryService();

export const listCategoriesResolver = (args: ListPayload) =>
  categoryService.listCategories(args);
