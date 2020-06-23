import { AuthenticationError } from 'apollo-server';

import { API_KEY } from './constants';
import { newToken } from './utils/auth';
import { MovieList } from './models/movieList';
import { Resolvers } from './graphql-types';

const resolvers: Resolvers = {
    Query: {
        movies: async (_, { input }, { axios }) => {
            let response;
            if (input.query) {
                response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${input.query}&page=${input.page}`,
                );
            } else {
                response = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${input.page}`,
                );
            }
            return response.data.results;
        },
        movie: async (_, { input }, { axios }) => {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/movie/${input.id}?api_key=${API_KEY}&language=en-US`,
            );
            return data;
        },
        lists: async (_, __, { models, userId }) => {
            const lists = await models.List.findAll({
                where: { userId },
                include: [MovieList],
            });
            return lists;
        },
        list: async (_, { input }, { models, userId }) => {
            const list = await models.List.findOne({ where: { id: input.id, userId }, include: [MovieList] });
            return list;
        },
    },
    Mutation: {
        signup: async (_, { input }, { models }) => {
            const existing = await models.User.findOne({ where: { email: input.email } });

            if (existing) {
                throw new AuthenticationError('User with email already exists');
            }

            const { id } = await models.User.create(input);
            const token = newToken(id);
            return { token, id, email: input.email, lists: [] };
        },
        signin: async (_, { input }, { models }) => {
            const user = await models.User.findOne({ where: { email: input.email } });
            if (!user) {
                throw new AuthenticationError('User with email does not exist');
            }

            const passwordMatch = await user.checkPassword(input.password);
            if (!passwordMatch) {
                throw new AuthenticationError('Wrong email and password combination');
            }

            const token = newToken(user.id);
            return { token, id: user.id, email: input.email, lists: [] };
        },
        createList: async (_, { input }, { models, userId }) => {
            const list = await models.List.create({ userId, name: input.name });
            return list;
        },
        addMovieToList: async (_, { input }, { models, userId }) => {
            await models.MovieList.create({
                userId,
                movieId: input.movieId,
                listId: input.listId,
            });
            const list = await models.List.findOne({
                where: { id: input.listId },
                include: [MovieList],
            });
            return list;
        },
    },
    List: {
        user: async (list, _, { models }) => {
            const user = await models.User.findOne({ where: { id: list.userId } });
            return user;
        },
        movies: async (list, _, { axios }) => {
            if (!list.movieLists) {
                return [];
            }
            const movieIds: number[] = list.movieLists.map((movieList) => movieList.get('movieId'));
            const movies = await Promise.all(
                movieIds.map(async (movieId) => {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
                    );
                    return response.data;
                }),
            );
            return movies;
        },
    },
};

export default resolvers;
