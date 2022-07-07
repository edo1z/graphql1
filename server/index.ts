import { ApolloServer } from "apollo-server";
import { books } from "./data/books";
import { authors } from "./data/authors";
import { typeDefs } from "./typeDefs";

const resolvers = {
  Query: {
    books: () => {
      return books.map((book) => {
        const author = authors.find((author) => author.id === book.author_id);
        return { ...book, author };
      });
    },
    authors: () => {
      return authors.map((author) => {
        const books_of_author = author.book_ids.map((book_id) => {
          return books.find((book) => book.id === book_id);
        });
        return { ...author, books: books_of_author };
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
