import { Types } from 'mongoose';
import {ListResult } from './repository.itf' 

export type LoginPayload = {
  email: string;
  password: string;
};

export type Publisher = {
  id: string
  _id: Types.ObjectId
  fullname: string
  email: string
}

export interface ListPublishers extends ListResult<Publisher> {}