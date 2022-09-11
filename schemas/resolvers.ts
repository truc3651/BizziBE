import CategoryService from "../services/category";
import NewsService from "../services/news";
import PublisherService from "../services/publisher";
import { isRequirementAcceptable } from "../utils/common";

const categoryService = new CategoryService();
const newsService = new NewsService();
const publisherService = new PublisherService();

export default {
  News: {
    publisher: (
      parent,
      _,
      { publisher, loaders: { publisherLoaderByNews } }
    ) => {
      console.log(">>publisher", publisher);
      const publisherId = parent.publisherId || publisher._id;
      return publisherLoaderByNews.load(publisherId);
    },
    category: (parent, _, { loaders: { categoryLoaderByNews } }) =>
      categoryLoaderByNews.load(parent.categoryId),
  },
  Publisher: {
    news: async (parent, _, { loaders: { newsLoaderByPublisher } }) =>
      newsLoaderByPublisher.load(parent._id),
  },
  Category: {
    news: async (parent, _, { loaders: { newsLoaderByCategory } }) =>
      newsLoaderByCategory.load(parent._id),
  },
  Query: {
    listCategories: async (parent, args) =>
      categoryService.listCategories(args),
    listNews: (parent, args) => {
      isRequirementAcceptable({ limit: args.limit });
      return newsService.listNews(args);
    },
    listMyNews: (parent, args, context) =>
      newsService.listMyNews({
        ...args,
        publisherId: context.publisher.id,
      }),
    getNewsDetail: (parent, args) => newsService.getNewsDetail(args.id),
    listPublishers: (parent, args) => {
      isRequirementAcceptable({ limit: args.limit });
      return publisherService.listPublishers(args);
    },
  },
  Mutation: {
    createNews: async (parent, args, { publisher }) =>
      newsService.createNews({
        ...args,
        publisherId: publisher.id,
      }),
    updateNews: (parent, args, context) =>
      newsService.updateNews({
        ...args,
        publisherId: context.publisher.id,
      }),
    deleteNews: (parent, args, context) =>
      newsService.deleteNews({
        ...args,
        publisherId: context.publisher.id,
      }),
    loginPublisher: (parent, args) => publisherService.login(args),
  },
};
