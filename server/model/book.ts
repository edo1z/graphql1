import { Author } from "./author";

export type Book = {
  id: Number;
  title: String;
  author: Author;
  price: Number;
  stock: Boolean;
};

export type BookId = {
  id: Number;
};
