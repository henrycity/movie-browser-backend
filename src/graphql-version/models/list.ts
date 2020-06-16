import { Table, Column, Model, AllowNull, ForeignKey, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { User } from './user';
import { MovieList } from './movieList';

@Table
export class List extends Model<List> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @AllowNull(false)
    @Column
    name: string;

    @HasMany(() => MovieList)
    movieLists: MovieList[];
}
