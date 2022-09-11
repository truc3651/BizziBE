import { ListPayload } from "../interfaces/repository.itf";
import { LoginPayload } from "../interfaces/publisher.itf";
import { verifyPassword } from "../utils/password";
import { generateNewToken } from "../utils/jwt";
import BaseService from "./BaseService";
import PublisherModel, { PublisherDocument } from "../models/publisher";
import { Types } from "mongoose";

export default class PublisherService extends BaseService<PublisherDocument> {
  constructor() {
    super(PublisherModel);
  }

  public async login(args: LoginPayload) {
    const publisher = await this.find({ email: args.email });
    if (!publisher) throw Error("email not found");

    if (
      verifyPassword({
        hashedPassword: publisher.passwordHashed,
        salt: publisher.passwordSalt,
        plainPassword: args.password,
      })
    ) {
      const token = generateNewToken({
        secretKey: publisher.accessSecretKey,
        payload: {
          id: publisher._id.toString(),
          email: publisher.email,
        },
      });
      return token;
    } else {
      throw Error("password not match");
    }
  }

  public async listPublishers(args: ListPayload) {
    return this.list({
      ...args,
      select: "id fullname email",
    });
  }

  public getPublisher(id: Types.ObjectId) {
    return this.find({
      _id: id,
    });
  }
}
