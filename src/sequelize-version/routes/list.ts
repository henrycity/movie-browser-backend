import { Router } from 'express';

import { getList, getLists, createList, addMovieToList } from '../controllers/list';

const router = Router();

router.get('/', getLists);

router.post('/', createList);

router.get('/:listName', getList);

router.post('/:listName', addMovieToList);

export default router;
