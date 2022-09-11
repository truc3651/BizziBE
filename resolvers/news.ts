import NewsService from "../services/news";
import {
  CreatePayload,
  UpdatePayload,
  ListNewsPayload,
  ListMyNewsPayload,
} from "../services/news.types";

const newsService = new NewsService();

export const createNewsResolver = (payload: CreatePayload) =>
  newsService.createNews(payload);

export const updateNewsResolver = async (payload: UpdatePayload) =>
  newsService.updateNews(payload);

export const deleteNewsResolver = async (id: string) => {
  const haha = await newsService.deleteNews(id);
  console.log(">>>delete haha", haha);
  return haha;
};

export const listAllNewsResolver = (args: ListNewsPayload) =>
  newsService.listNews(args);

export const listMyNewsResolver = (args: ListMyNewsPayload) =>
  newsService.listMyNews(args);

export const getDetailNewsResolver = (id: string) => newsService.getNewsDetail(id);