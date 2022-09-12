import { Types } from "mongoose";
import {
  CreatePayload,
  UpdatePayload,
  ListNewsPayload,
  ListMyNewsPayload,
} from "../interfaces/news.itf";
import CategoryService from "./category";
import PublisherService from "./publisher";
import BaseService from "./BaseService";
import NewsModel, { NewsDocument } from "../models/news";
import { removeNilValue } from "../utils/common";

export default class NewsService extends BaseService<NewsDocument> {
  private categoryService: CategoryService;
  private publisherService: PublisherService;

  constructor() {
    super(NewsModel);
    this.categoryService = new CategoryService();
    this.publisherService = new PublisherService();
  }
  public async createNews(args: CreatePayload) {
    const publisherId = new Types.ObjectId(args.publisherId);
    const categoryId = new Types.ObjectId(args.categoryId);
    await Promise.all([
      this.categoryService.findOrFail({ _id: categoryId }),
      this.publisherService.findOrFail({ _id: publisherId }),
    ]);

    return this.create({
      ...args,
      categoryId,
      publisherId,
    });
  }

  public async updateNews(args: UpdatePayload) {
    const { id, categoryId, title, content } = args;
    const objectId = new Types.ObjectId(id);
    const publisherId = new Types.ObjectId(args.publisherId);
    const news = await this.find({
      _id: objectId,
      publisherId,
    });

    if (!news) throw Error("not found");
    if (!title && !content && !categoryId) {
      return news;
    }
    if (categoryId) {
      const categoryId = new Types.ObjectId(args.categoryId);
      await this.categoryService.findOrFail({ _id: categoryId });
    }
    return this.update(objectId, {
      ...removeNilValue(args),
      ...(categoryId ? { categoryId: new Types.ObjectId(categoryId) } : {}),
    });
  }

  public async deleteNews({
    id,
    publisherId,
  }: {
    id: string;
    publisherId: string;
  }) {
    const objectId = new Types.ObjectId(id);
    if (
      !(await this.find({
        _id: objectId,
        isDeleted: false,
        publisherId: new Types.ObjectId(publisherId),
      }))
    ) {
      throw new Error("not found");
    }

    const deletedNews = await this.update(objectId, {
      isDeleted: true,
    });
    return deletedNews.isDeleted;
  }

  public getNewsDetail(id: string) {
    return this.find(new Types.ObjectId(id));
  }

  public async listNews(args: ListNewsPayload) {
    const condition: Record<string, any> = {
      isDeleted: false,
    };
    args.categoryId &&
      (condition.categoryId = new Types.ObjectId(args.categoryId));
    if (args.keyword) {
      const regex = new RegExp(args.keyword, "i"); // i for case insensitive
      condition.$or = [{ title: regex }];
    }
    return this.list({
      ...args,
      condition,
    });
  }

  public listMyNews(args: ListMyNewsPayload) {
    const condition: Record<string, any> = {
      publisherId: new Types.ObjectId(args.publisherId),
    };
    args.categoryId &&
      (condition.categoryId = new Types.ObjectId(args.categoryId));
    if (args.keyword) {
      const regex = new RegExp(args.keyword, "i"); // i for case insensitive
      condition.$or = [{ title: regex }];
    }
    return this.list({
      ...args,
      condition,
    });
  }

  public async listTwoNewsByCategory(categoryId: Types.ObjectId) {
    const categoryObjectId = new Types.ObjectId(categoryId);
    await this.categoryService.findOrFail({ _id: categoryObjectId });

    return this.list({
      condition: {
        categoryId,
        isDeleted: false,
      },
    });
  }
}
