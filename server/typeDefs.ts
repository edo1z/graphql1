import { gql } from "apollo-server";

export const typeDefs = gql`
  type Book {
    id: ID
    title: String
    author: Author
    price: Int
    stock: Boolean
  }

  type Author {
    id: ID
    name: String
    books: [Book]
  }

  type Query {
    books: [Book]
    authors: [Author]
  }
`;
