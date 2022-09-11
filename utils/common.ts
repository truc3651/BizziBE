import { Types } from "mongoose";

export const generateRandomString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const isRequirementAcceptable = ({ limit }: { limit: number }) => {
  if (limit && limit > 1000)
    throw new Error("This is huge. We can handle that.");
};

export const removeNilValue = (obj: Record<string, any>) => {
  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key];
    }
  }
  return obj;
};

export const groupByProvidedKey = (
  data: Array<any>,
  groupByData: Array<string | Types.ObjectId>,
  groupByKey: string
) => {
  const groupByField = {};
  groupByData.forEach((key) => {
    key = key.toString();
    const batch = customFilter(
      data,
      3,
      (rec) => rec[groupByKey].toString() === key
    );
    groupByField[key] = batch;
  });

  return Object.values(groupByField);
};

export const groupBy = (
  data: Array<any>,
  groupByData: Array<string | Types.ObjectId>
) => {
  const groupByField: Record<string, any> = {};
  data.forEach((rec) => {
    if (!groupByField[rec._id.toString()]) {
      groupByField[rec._id.toString()] = rec;
    }
  });
  return groupByData.map((key) => groupByField[key.toString()]);
};

function customFilter<T>(
  array: Array<T>,
  limitedLength: number,
  func: Function
) {
  const filtered: Array<T> = [];
  for (let i = 0; i < array.length; i++) {
    if (func(array[i])) filtered.push(array[i]);
    if (filtered.length === limitedLength) return filtered;
  }
  return filtered;
}
