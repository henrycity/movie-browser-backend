import { Request, Response, Router } from 'express';

import { List } from '../models/list';
import { User } from '../models/user';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const movies = await List.findAll({ where: { userId: req.user.id } });
    res.json(movies);
});

router.put('/', async (req: Request, res: Response) => {
    const user = await User.findByPk(req.user.id);
    user.lists.push(req.body.list);
    const updatedUser = await User.update({ lists: user.lists }, { where: { id: req.user.id }, returning: true });
    res.json(updatedUser);
});

router.post('/:type', async (req: Request, res: Response) => {
    const { movieId, type } = req.body;
    const item = await List.create({
        userId: req.user.id,
        movieId,
        type,
    });
    res.json(item);
});

export default router;
