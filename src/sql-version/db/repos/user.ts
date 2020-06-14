import { IDatabase, IMain } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { User } from '../models';
import { users as sql } from '../sql';

/*
 This repository mixes hard-coded and dynamic SQL, just to show how to use both.
*/

export class UsersRepository {
    /**
     * @param db
     * Automated database connection context/interface.
     *
     * If you ever need to access other repositories from this one,
     * you will have to replace type 'IDatabase<any>' with 'any'.
     *
     * @param pgp
     * Library's root, if ever needed, like to access 'helpers'
     * or other namespaces available from the root.
     */
    constructor(private db: IDatabase<any>, private pgp: IMain) {
        /*
      If your repository needs to use helpers like ColumnSet,
      you should create it conditionally, inside the constructor,
      i.e. only once, as a singleton.
    */
    }

    // Adds a new user, and returns the new object;
    async add(name: string, password: string): Promise<User> {
        return this.db.one(sql.add, { name, password });
    }

    // // Tries to find a user from id;
    // async findById(id: number): Promise<User | null> {
    //     return this.db.oneOrNone('SELECT * FROM users WHERE id = $1', +id);
    // }
}
