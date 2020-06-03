import { Request, Response, Router } from 'express';

import { List } from '../models/list';
import { User } from '../models/user';
import { sequelize } from '../utils/sequelize';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const user = await User.findByPk(req.user.id);
    res.json(user.lists);
});

router.post('/', async (req: Request, res: Response) => {
    const user = await User.findByPk(req.user.id);
    const { listName } = req.body;
    if (listName) {
        user.lists.push(listName);
        const updatedUser = await User.update(
            { lists: user.lists },
            { where: { id: req.user.id }, returning: true, plain: true },
        );
        res.json(updatedUser[1].lists);
    } else {
        res.sendStatus(400);
    }
});

router.get('/:listName', async (req: Request, res: Response) => {
    const movies = await List.findAll({ where: { userId: req.user.id, listName: req.params.listName } });
    res.json(movies);
});

router.post('/:listName', async (req: Request, res: Response) => {
    const { listName } = req.params;
    const { movieId } = req.body;
    const item = await List.create({
        userId: req.user.id,
        movieId,
        listName,
    });
    res.json(item);
});

router.get('/watchlist', async (req: Request, res: Response) => {
    const lists = await List.findAll({
        attributes: ['listName', [sequelize.fn('count', sequelize.col('movieId')), 'numberOfMovies']],
        where: { userId: req.user.id },
        group: ['listName'],
    });
    res.json(lists);
});

export default router;
