import { Table, Column, Model, AllowNull, ForeignKey, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { User } from './user';

@Table
export class List extends Model<List> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @Column
    movieId: string;

    @AllowNull(false)
    @Column
    listName: string;

    @Column
    userRating: number;
}
