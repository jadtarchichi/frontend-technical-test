export type SearchParams = {
  redirect?: string;
};

export type Inputs = {
  username: string;
  password: string;
};

export type LoginResponse = {
  jwt: string
};

export type GetUserByIdResponse = {
  id: string;
  username: string;
  pictureUrl: string;
};