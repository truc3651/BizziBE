import env from "../../configs/env";
import mongooseConnect from "../../mongoose";
import mongoose from "mongoose";
import PublisherService from "../../services/publisher";
import { generateRandomString } from "../../utils/common";
import { generateSalt, hashPassword } from "../../utils/password";

describe("publisher", () => {
  let publisherService: PublisherService;

  beforeAll(async () => {
    mongooseConnect(env.MONGODB_CONNECTION_STRING_TEST!);
    publisherService = new PublisherService();
    const [salt1, salt2] = [generateSalt(), generateSalt()];
    return publisherService.createMany([
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
    ]);
  });

  afterAll(() => {
    return mongoose.connection.db.dropCollection("publisher");
  });

  it("publisher login", async () => {
    const result = await publisherService.login({
      email: "thanhtre3651@gmail.com",
      password: "123",
    });
    expect(typeof result).toBe("string");
  });

  it("list publishers", async () => {
    const result = await publisherService.listPublishers({});
    expect(result.data).toHaveLength(2);
  });
});
