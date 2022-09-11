import env from "../../configs/env";
import mongooseConnect from "../../mongoose";
import mongoose from "mongoose";
import CategoryService from "../../services/category";

describe("category", () => {
  let categoryService: CategoryService;

  beforeAll(async () => {
    mongooseConnect(env.MONGODB_CONNECTION_STRING_TEST!);
    categoryService = new CategoryService();
    return categoryService.createMany([
      {
        name: "the thao",
      },
      {
        name: "thoi su",
      },
    ]);
  });

  afterAll(() => {
    return mongoose.connection.db.dropCollection("category");
  });

  it("list all categories", async () => {
    const result = await categoryService.listCategories({ select: "name" });
    expect(result.data).toHaveLength(2);
    expect(result.totalPages).toBe(1);
    const dataWithNameOnly = result.data.map((rec) => rec.name);
    expect(dataWithNameOnly).toEqual(["the thao", "thoi su"]);
  });

  it("list categories by pagination", async () => {
    const result = await categoryService.listCategories({
      page: 1,
      limit: 1,
    });
    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toHaveProperty("name", "the thao");
    expect(result.data[0]).toHaveProperty("_id");
  });
});
