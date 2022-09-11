import jwtDecode from "jwt-decode";
import { verifyToken } from "../utils/jwt";
import PublisherService from "../services/publisher";

const publisherService = new PublisherService();
const shield = {
  listMyNews: 1,
  createNews: 1,
  updateNews: 1,
  deleteNews: 1,
};

export default async function (resolve, root, args, context, info) {
  const { key, typename } = info.path;
  if (shield[key]) {
    const { req } = context;
    if (req.headers && req.headers.authorization) {
      let token = req.headers.authorization;
      token = token.replace("Bearer", "").trim();
      const payload = jwtDecode(token) as { email: string };
      const publisher = await publisherService.find(
        {
          email: payload.email,
        },
        "accessSecretKey fullname email id"
      );
      if (!publisher) throw new Error("Token has something wrong");
      verifyToken({ token, secretKey: publisher.accessSecretKey });
      context.publisher = {
        _id: publisher._id,
        id: publisher.id,
        email: publisher.email,
      };
    } else {
      throw new Error("un authorized");
    }
  }
  return resolve(root, args, context, info);
};;
