import axios from "axios";

const main = async () => {
  try {
    let result = await getBooks();
    console.log("Books", result.data.data.books);
    result = await getBook(1);
    console.log("Book[ID:1]", result.data.data.book);
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
  return await request(query);
};

const getBook = async (bookId: Number) => {
  const query = `query { book(id:${bookId}) {id title price}}`;
  return await request(query);
};

const request = async (query: String) => {
  return await axios({
    method: "post",
    headers: { "content-type": "application/json" },
    url: "http://localhost:4000",
    data: { query: query },
  });
};

main();
