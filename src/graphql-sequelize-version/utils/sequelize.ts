import { Sequelize } from 'sequelize-typescript';

import models from '../models/';

export const sequelize = new Sequelize({
    dialect: 'postgres',
});

sequelize.addModels([models.List, models.User, models.MovieList]);
