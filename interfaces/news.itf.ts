import { Types } from "mongoose";
import { ListResult } from "./repository.itf";
import { ListPayload } from "../interfaces/repository.itf";

export interface News {
  id: string;
  _id: Types.ObjectId;
  title: string;
  content: string;
  publisherId: Types.ObjectId;
}

export interface CreatePayload {
  categoryId: string;
  title: string;
  content: string;
  publisherId: string;
}

export interface UpdatePayload {
  id: string;
  categoryId?: string;
  title?: string;
  content?: string;
  publisherId: string;
}

export type ListNewsPayload = {
  categoryId?: string;
} & ListPayload;

export type ListMyNewsPayload = {
  publisherId: string;
} & ListNewsPayload;

export interface ListNews extends ListResult<News> {}
