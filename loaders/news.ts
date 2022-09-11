import { Types } from "mongoose";
import NewsService from "../services/news";
import { groupByProvidedKey } from "../utils/common";
const newsService = new NewsService();

export const fetchNewsByPublisher = async (publisherIds: Types.ObjectId[]) => {
  const data = await newsService.list({
    condition: {
      publisherId: { $in: publisherIds },
    },
    limit: 100,
  });
  return groupByProvidedKey(data.data, publisherIds, "publisherId");
};

export const fetchNewsByCategory = async (categoryIds) => {
  const data = await newsService.list({
    condition: {
      categoryId: { $in: categoryIds },
    },
    limit: 100,
  });
  return groupByProvidedKey(data.data, categoryIds, "categoryId");
};
