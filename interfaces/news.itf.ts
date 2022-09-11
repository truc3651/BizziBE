import { Types } from 'mongoose';
import {ListResult } from './repository.itf' 

export interface News {
  id: string
  _id: Types.ObjectId
  title: string
  content: string
  publisherId: Types.ObjectId
}

export interface CreateNewsPayload {
  title: string
  content: string
  categoryId: Types.ObjectId
}

export interface UpdateNewsPayload {
  id: Types.ObjectId
  title?: string
  content?: string
  categoryId?: Types.ObjectId
}

export interface ListNews extends ListResult<News> {}