import { gql } from "apollo-server-express";

export default gql`
  type Category {
    id: String!
    name: String!
    news: [News!]
  }

  type News {
    id: String!
    title: String!
    content: String!
    publisher: Publisher
    category: Category!
    isDeleted: Boolean
  }

  type Publisher {
    id: String!
    fullname: String!
    email: String!
    news: [News!]
  }

  interface Pagination {
    limit: Int!
    page: Int!
    total: Int!
    totalPages: Int!
  }

  type ListCategories implements Pagination {
    limit: Int!
    page: Int!
    total: Int!
    totalPages: Int!
    data: [Category!]!
  }

  type ListNews implements Pagination {
    limit: Int!
    page: Int!
    total: Int!
    totalPages: Int!
    data: [News!]!
  }

  type ListPublishers implements Pagination {
    limit: Int!
    page: Int!
    total: Int!
    totalPages: Int!
    data: [Publisher!]!
  }

  type Query {
    listCategories: ListCategories!
    listNews(
      page: Int
      limit: Int
      categoryId: String
      keyword: String
    ): ListNews!
    getNewsDetail(id: String!): News
    listMyNews(
      page: Int
      limit: Int
      categoryId: String
      keyword: String
    ): ListNews!
    listPublishers(page: Int, limit: Int, keyword: String): ListPublishers!
  }

  type Mutation {
    createNews(title: String!, content: String!, categoryId: String!): News!
    updateNews(
      id: String!
      title: String
      content: String
      categoryId: String
    ): News
    deleteNews(id: String!): Boolean!
    loginPublisher(email: String!, password: String!): String
  }
`;


