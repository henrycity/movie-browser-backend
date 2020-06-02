import { Request, Response, Router } from 'express';

import { List } from '../models/list';
import { User } from '../models/user';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const movies = await List.findAll({ where: { userId: req.user.id } });
    res.json(movies);
});

router.post('/', async (req: Request, res: Response) => {
    const user = await User.findByPk(req.user.id);
    user.lists.push(req.body.list);
    const updatedUser = await User.update(
        { lists: user.lists },
        { where: { id: req.user.id }, returning: true, plain: true },
    );
    res.json(updatedUser[1].lists);
});

router.get('/:type', async (req: Request, res: Response) => {
    const movies = await List.findAll({ where: { userId: req.user.id, type: req.params.type } });
    res.json(movies);
});

router.post('/:type', async (req: Request, res: Response) => {
    const { type } = req.params;
    const { movieId } = req.body;
    const item = await List.create({
        userId: req.user.id,
        movieId,
        type,
    });
    res.json(item);
});

export default router;
