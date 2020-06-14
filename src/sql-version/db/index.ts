import pgPromise, { IMain } from 'pg-promise';
import * as dbConfig from './db-config.json';

const pgp: IMain = pgPromise({});
const db = pgp(dbConfig);

export { db, pgp };
