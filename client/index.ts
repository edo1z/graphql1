import axios from "axios";
import { BookInput } from "../server/model/book";

const main = async () => {
  try {
    let result = await addBook({
      title: "走れメロス",
      authorId: "9413aa5c-a33a-4df8-a7eb-1bf9d8d3fa85",
      price: 800,
      stock: true,
    });
    console.log("Added Book", result.data.data.addBook);

    result = await getBooks();
    console.log("Books", result.data.data.books);

    result = await getBook("47a03a39-14ba-4863-bfee-1e1ef32ff7aa");
    console.log("Book", result.data.data.book);
  } catch (err: any) {
    console.log(
      "ERROR!",
      err.response.status,
      `[${err.response.statusText}]`,
      err.response.data.errors[0].message
    );
  }
};

const getBooks = async () => {
  const query = "query { books {id title price}}";
  return await request({ query: query });
};

const getBook = async (bookId: string) => {
  const query = `query { book(id:"${bookId}") {id title price}}`;
  return await request({ query: query });
};

const addBook = async (book: BookInput) => {
  const query = `mutation AddBook($book:BookInput!) { addBook(book:$book) {id title author {id name}} }`;
  const variables = { book: book };
  return await request({ query: query, variables: variables });
};

const request = async (data: {}) => {
  return await axios({
    method: "post",
    headers: { "content-type": "application/json" },
    url: "http://localhost:4000",
    data: data,
  });
};

main();
