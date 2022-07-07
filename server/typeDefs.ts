import { gql } from "apollo-server";

export const typeDefs = gql`
  type Book {
    id: Int!
    title: String!
    author: Author!
    price: Int
    stock: Boolean
  }

  type Author {
    id: Int!
    name: String!
    books: [Book]
  }

  type Query {
    books: [Book]
    book(id: Int!): Book
    authors: [Author]
    author(id: Int!): Author
  }
`;
