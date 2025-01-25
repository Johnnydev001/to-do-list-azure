export type Todo = {
  id?: string;
  text: string;
};

export type RequestOptions = RequestInit & {
  url: string;
  origin?: string;
};
