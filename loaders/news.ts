import { Types } from "mongoose";
import NewsService from "../services/news";
import { groupByProvidedKey } from "../utils/common";
const newsService = new NewsService();

export const fetchNewsByPublisher = async (publisherIds: Types.ObjectId[]) => {
  const data = await newsService.list({
    condition: {
      publisherId: { $in: publisherIds },
    },
  });
  return groupByProvidedKey(data.data, publisherIds, "publisherId");
};

export const fetchNewsByCategory = async (categoryIds: Types.ObjectId[]) => {
  const data = await newsService.list({
    condition: {
      categoryId: { $in: categoryIds },
    },
  });
  return groupByProvidedKey(data.data, categoryIds, "categoryId");
};
