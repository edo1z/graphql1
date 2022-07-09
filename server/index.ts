import { ApolloServer } from "apollo-server";
import { books } from "./data/books";
import { authors } from "./data/authors";
import { typeDefs } from "./typeDefs";
import { BookId } from "./model/book";
import { AuthorId } from "./model/author";

const resolvers = {
  Query: {
    books: () => {
      return books.map((book) => {
        const author = authors.find((author) => author.id === book.author_id);
        return { ...book, author };
      });
    },
    book: (parent: any, args: BookId, context: any, info: any) => {
      return books.find((book) => book.id === args.id);
    },
    authors: () => {
      return authors.map((author) => {
        const books_of_author = author.book_ids.map((book_id) => {
          return books.find((book) => book.id === book_id);
        });
        return { ...author, books: books_of_author };
      });
    },
    author: (parent: any, args: AuthorId, context: any, info: any) => {
      return authors.find((author) => author.id === args.id);
    },
  },
  Book: {
    author: (parent: any) =>
      authors.find((author: any) => author.id === parent.author_id),
  },
  Author: {
    books: (parent: any) => books.filter((book) => book.author_id == parent.id),
  },
};

const logger = {
  async requestDidStart(requestContext: any) {
    return {
      async didEncounterErrors(requestContext: any) {
        console.log("Error!", requestContext.errors);
      },
    };
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [logger],
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
