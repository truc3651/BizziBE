import mongoose, { Types } from 'mongoose';

export interface ListPayload<T = any> {
  page?: number;
  limit?: number;
  keyword?: string;
  condition?: mongoose.FilterQuery<T>;
  select?: string;
}

export interface ListResult<T> {
  data: T[];
  totalPages: number;
  total: number;
  page?: number;
  limit?: number;
}

export interface DeletePayload {
  id: Types.ObjectId
}