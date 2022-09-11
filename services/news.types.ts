import { ListPayload } from "../interfaces/repository.itf";

export type CreatePayload = {
  categoryId: string;
  title: string;
  content: string;
  publisherId: string;
};

export type UpdatePayload = {
  id: string;
  categoryId?: string;
  title?: string;
  content?: string;
  publisherId: string;
};

export type ListNewsPayload = {
  categoryId?: string;
} & ListPayload;

export type ListMyNewsPayload = {
  publisherId: string;
} & ListNewsPayload;
