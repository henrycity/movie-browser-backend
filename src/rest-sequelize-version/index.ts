import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { sequelize } from './utils/sequelize';
import routes from './routes';
import { protect, signin, signup } from './utils/auth';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/signup', signup);
app.post('/signin', signin);

app.use('/api', protect);
app.use('/api/user', routes.user);
app.use('/api/movie', routes.movie);
app.use('/api/list', routes.list);

sequelize.sync().then(() => {
    app.listen(4000, () => {
        console.log('App listening on port 4000!');
    });
});
