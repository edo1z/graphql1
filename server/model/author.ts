import { Book } from "./book";

export type Author = {
  id: Number;
  name: String;
  books: [Book];
};
export type AuthorId = {
  id: Number;
};
