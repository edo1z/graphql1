import { Author } from "./author";

export type Book = {
  id: string;
  title: string;
  authorId: string;
  price: number;
  stock: boolean;
};

export type BookID = {
  id: string;
};

export type BookInput = {
  title: string;
  authorId: string;
  price: number;
  stock: boolean;
};
