import bcrypt from 'bcryptjs';
import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    Unique,
    AllowNull,
    BeforeCreate,
    DataType,
    Default,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @AllowNull(false)
    @Column
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @Default([])
    @Column(DataType.ARRAY(DataType.STRING))
    lists: string[];

    @BeforeCreate
    static async hashPassword(instance: User) {
        const salt = await bcrypt.genSalt(10); //whatever number you want
        instance.password = await bcrypt.hash(instance.password, salt);
    }

    async checkPassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }
}
