import express from "express";
import mongoose from "./mongoose";
import { server } from "./apolloServer";
import env from "./configs/env";

async function startApolloServer() {
  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: env.PORT }, () => {
    console.log("Server is running at ", env.PORT);
    mongoose(env.MONGODB_CONNECTION_STRING);
  });
}
startApolloServer();
