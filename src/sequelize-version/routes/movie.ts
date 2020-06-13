import { Router } from 'express';

import { getMovie, getMovies } from '../controllers/movie';

const router = Router();

router.get('/', getMovies);

router.get('/:movieId', getMovie);

// TODO: Think about this use case again
// router.put('/:movieId', async (req: Request, res: Response) => {
//     const { movieId } = req.params;
//     const userMovie = await List.findOne({ where: { movieId, userId: req.user.id } });
//     userMovie.userRating = req.body.userRating;
//     await userMovie.save();
//     res.json(userMovie);
// });

export default router;
