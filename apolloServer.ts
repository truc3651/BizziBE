import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import DataLoader from "dataloader";
import authMiddleware from "./middlewares/auth";
import typeDefs from "./schemas/typeDefs";
import resolvers from "./schemas/resolvers";
import { fetchNewsByPublisher, fetchNewsByCategory } from "./loaders/news";
import { fetchPublisherByNews } from "./loaders/publisher";
import { fetchCategoryByNews } from "./loaders/category";

interface Context extends ExpressContext {
  loaders: Record<string, typeof DataLoader>
}

const server = new ApolloServer({
  schema: applyMiddleware(
    makeExecutableSchema({ typeDefs, resolvers }),
    authMiddleware
  ),
  csrfPrevention: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  context: (context: Context) => {
    // context.loaders = {
    //   newsLoaderByPublisher: new DataLoader(fetchNewsByPublisher),
    //   newsLoaderByCategory: new DataLoader(fetchNewsByCategory),
    //   publisherLoaderByNews: new DataLoader(fetchPublisherByNews),
    //   categoryLoaderByNews: new DataLoader(fetchCategoryByNews),
    // }
    Object.assign(context, {
      loaders: {
        newsLoaderByPublisher: new DataLoader(fetchNewsByPublisher),
        newsLoaderByCategory: new DataLoader(fetchNewsByCategory),
        publisherLoaderByNews: new DataLoader(fetchPublisherByNews),
        categoryLoaderByNews: new DataLoader(fetchCategoryByNews),
      },
    });
    return context;
  },
});

export { server };
