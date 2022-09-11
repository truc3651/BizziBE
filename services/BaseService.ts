// @ts-nocheck
import { ListPayload, ListResult } from "../interfaces/repository.itf";
import mongoose, { Types } from "mongoose";

export default class BaseService<T> {
  protected _model: mongoose.Model<T>;

  constructor(model: mongoose.Model<T>) {
    this._model = model;
  }

  async create(args: Partial<T>): Promise<T> {
    const newObject = new this._model(args);
    await newObject.save();
    const result = newObject.toJSON() as T;
    return result;
  }

   async createMany(args: Array<Partial<T>>): Array<Promise<T>> {
    const result = await this._model.insertMany(args)
    return result
  }

  async update(
    id: Types.ObjectId,
    args: Partial<T>
  ): Promise<Partial<T> | undefined> {
    const updatedObject = await this._model.findByIdAndUpdate(
      id,
      {
        $set: args,
      },
      { new: true }
    );
    return updatedObject?.toObject() as T;
  }

  delete(id: Types.ObjectId) {
    return this._model.findByIdAndDelete(id);
  }

  find(
    condition: Record<string, any>,
    select?: string
  ): Promise<T | undefined> {
    const selects = {};
    select &&
      select
        .split(" ")
        .forEach((select) => Object.assign(selects, { [select]: 1 }));
    return this._model.findOne(condition).select(selects).exec() as Promise<
      T | undefined
    >;
  }

  async list({
    page = 1,
    limit = 10,
    condition,
    select,
  }: ListPayload): Promise<ListResult<T>> {
    const selects = {};
    select &&
      select
        .split(" ")
        .forEach((select) => Object.assign(selects, { [select]: 1 }));
    const [count, data] = await Promise.all([
      this._model.count(condition),
      this._model
        .find(condition)
        .skip((page - 1) * limit)
        .limit(limit)
        .select(selects),
    ]);

    return {
      data,
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit) || 1,
    };
  }

  deleteAll() {
    return this._model.deleteMany({});
  }
}
