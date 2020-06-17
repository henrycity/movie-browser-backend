import {
    Table,
    Column,
    Model,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { List } from './list';

@Table
export class MovieList extends Model<MovieList> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    movieId: number;

    @ForeignKey(() => List)
    @Column
    listId: number;

    @BelongsTo(() => List)
    list: List;
}
