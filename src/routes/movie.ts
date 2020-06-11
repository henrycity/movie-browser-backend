import { Request, Response, Router } from 'express';
import axios from 'axios';

import { API_KEY } from '../constants';
import { List } from '../models/list';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const { page = 1, query } = req.query;
    let response;
    if (query) {
        console.log('query', query);
        response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`,
        );
    } else {
        response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
        );
    }
    res.json(response.data.results);
});

router.get('/:movieId', async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    res.json(data);
});

router.put('/:movieId', async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const userMovie = await List.findOne({ where: { movieId, userId: req.user.id } });
    userMovie.userRating = req.body.userRating;
    await userMovie.save();
    res.json(userMovie);
});

export default router;
