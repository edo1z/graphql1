import { ApolloServer } from "apollo-server";
import { books } from "./data/books";
import { authors } from "./data/authors";
import { typeDefs } from "./typeDefs";
import { BookID, BookInput } from "./model/book";
import { AuthorID } from "./model/author";
import { v4 as uuidv4 } from "uuid";

const resolvers = {
  Query: {
    books: () => {
      return books.map((book) => {
        const author = authors.find((author) => author.id === book.authorId);
        return { ...book, author };
      });
    },
    book: (parent: any, args: BookID, context: any, info: any) => {
      return books.find((book) => book.id === args.id);
    },
    authors: () => {
      return authors.map((author) => {
        const booksOfAuthor = author.bookIDs.map((bookId) => {
          return books.find((book) => book.id === bookId);
        });
        return { ...author, books: booksOfAuthor };
      });
    },
    author: (parent: any, args: AuthorID, context: any, info: any) => {
      return authors.find((author) => author.id === args.id);
    },
  },
  Book: {
    author: (parent: any) =>
      authors.find((author: any) => author.id === parent.authorId),
  },
  Author: {
    books: (parent: any) => books.filter((book) => book.authorId == parent.id),
  },
  Mutation: {
    addBook: (parent: any, args: any, context: any, info: any) => {
      const bookInput: BookInput = args.book;
      const newBook = {
        id: uuidv4(),
        ...bookInput,
      };
      books.push(newBook);
      return newBook;
    },
  },
};

const logger = {
  async requestDidStart() {
    return {
      async didEncounterErrors(requestContext: any) {
        console.log(
          "Error!",
          requestContext.errors,
          "[Query]",
          requestContext.request.query
        );
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
