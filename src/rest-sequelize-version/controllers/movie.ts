import { Request, Response } from 'express';
import axios from 'axios';
import { API_KEY } from '../constants';

export const getMovies = async (req: Request, res: Response) => {
    const { page = 1, query } = req.query;
    let response;
    if (query) {
        response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`,
        );
    } else {
        response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
        );
    }
    res.json(response.data.results);
};

export const getMovie = async (req: Request, res: Response) => {
    const { movieId } = req.params;
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
    res.json(data);
};
