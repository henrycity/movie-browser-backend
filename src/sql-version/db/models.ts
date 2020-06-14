/*
  Here we typed in simple models manually. But there are many tools out there
  for generating database models automatically, from an existing database.
  For example, schemats: https://github.com/sweetiq/schemats
*/

export interface User {
    id: number;
    email: string;
    password: string;
    lists: string[];
}

export interface List {
    id: number;
    user_id: number;
    movieId: number;
    listName: string;
    userRating: number;
}
