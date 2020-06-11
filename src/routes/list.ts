import { Request, Response, Router } from 'express';
import groupBy from 'lodash.groupby';

import { List } from '../models/list';
import { User } from '../models/user';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const lists = await List.findAll({
        where: { userId: req.user.id },
        attributes: ['userId', 'movieId', 'listName', 'userRating'],
    });
    const listsGroupByListName = groupBy(lists, 'listName');
    res.json(listsGroupByListName);
});

router.post('/', async (req: Request, res: Response) => {
    const user = await User.findByPk(req.user.id);
    const { listName } = req.body;
    if (listName) {
        user.lists.push(listName);
        const updatedUser = await User.update({ lists: user.lists }, { where: { id: req.user.id }, returning: true });
        res.json(updatedUser[1][0].dataValues.lists);
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

export default router;
