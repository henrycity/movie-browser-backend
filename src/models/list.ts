import { Table, Column, Model, AllowNull, ForeignKey } from 'sequelize-typescript';
import { User } from './user';

@Table
export class List extends Model<List> {
    @ForeignKey(() => User)
    @Column
    userId: number;

    @Column
    movieId: string;

    @AllowNull(false)
    @Column
    type: string;

    @Column
    userRating: number;
}
