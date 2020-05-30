import { Sequelize } from 'sequelize-typescript';

import { List } from './models/list';
import { User } from './models/user';

export const sequelize = new Sequelize({
    dialect: 'postgres',
});

sequelize.addModels([List, User]);
