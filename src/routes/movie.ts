import { Request, Response, Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/:movieId', async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US`,
    );
    res.json(data);
});

export default router;
