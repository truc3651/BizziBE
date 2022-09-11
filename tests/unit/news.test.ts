import mongooseConnect from "../../mongoose";
import mongoose from "mongoose";
import env from "../../configs/env";
import NewsService from "../../services/news";
import PublisherService from "../../services/publisher";
import CategoryService from "../../services/category";
import { generateRandomString } from "../../utils/common";
import { generateSalt, hashPassword } from "../../utils/password";

describe("news", () => {
  let newsService: NewsService;
  let publisherId: string;
  let categoryId: string;
  let newsId: string;

  beforeAll(async () => {
    mongooseConnect(env.MONGODB_CONNECTION_STRING_TEST!);
    newsService = new NewsService();
    const categoryService = new CategoryService();
    const publisherService = new PublisherService();

    const [salt1, salt2] = [generateSalt(), generateSalt()];

    const [publishers, categories] = await Promise.all([
      publisherService.createMany([
        {
          fullname: "thanh truc",
          email: "thanhtre3651@gmail.com",
          accessSecretKey: generateRandomString(30),
          passwordHashed: hashPassword({ salt: salt1, password: "123" }),
          passwordSalt: salt1,
        },
        {
          fullname: "thanh truc",
          email: "thanhtre3651@gmail.com",
          accessSecretKey: generateRandomString(30),
          passwordHashed: hashPassword({ salt: salt2, password: "123" }),
          passwordSalt: salt2,
        },
      ]),
      categoryService.createMany([
        {
          name: "the thao",
        },
        {
          name: "thoi su",
        },
      ]),
    ]);
    publisherId = (await publishers[0]).id;
    categoryId = (await categories[0]).id;
    return newsService.createMany([
      {
        title: "da banh",
        content: "hahaha",
        categoryId,
        publisherId,
      },
      {
        title: "da cau",
        content: "hahaha",
        categoryId: (await publishers[1]).id,
        publisherId: (await categories[1]).id,
      },
    ]);
  });

  afterAll(() => {
    return Promise.all([
      mongoose.connection.db.dropCollection("news"),
      mongoose.connection.db.dropCollection("category"),
      mongoose.connection.db.dropCollection("publisher"),
    ]);
  });

  it("list news", async () => {
    const result = await newsService.listNews({ select: "title content" });
    expect(result.data).toHaveLength(2);
    expect(result.totalPages).toBe(1);
    const dataWithNameOnly = result.data.map((rec) => ({
      title: rec.title,
      content: rec.content,
    }));
    expect(dataWithNameOnly).toEqual(
      expect.arrayContaining([
        { title: "da banh", content: "hahaha" },
        { title: "da cau", content: "hahaha" },
      ])
    );
  });

  it("list my news", async () => {
    const result = await newsService.listMyNews({
      select: "title content",
      publisherId,
    });
    expect(result.data).toHaveLength(1);
    expect(result.totalPages).toBe(1);
    expect(result.data[0]).toMatchObject({ title: "da banh" });
  });

  it("create news", async () => {
    const result = await newsService.createNews({
      title: "banh dua",
      content: "hahaha",
      categoryId,
      publisherId,
    });
    expect(result).toBeTruthy();
    newsId = result.id;
  });

  it("update news", async () => {
    const result = await newsService.updateNews({
      id: newsId,
      title: "banh dua huhu",
      publisherId,
    });
    expect(result).toBeTruthy();
  });

  it("delete news", async () => {
    const result = await newsService.deleteNews({
      id: newsId,
      publisherId,
    });
    expect(result).toBeTruthy();
  });
});
