import gql from 'graphql-tag';

const typeDefs = gql`
    directive @authenticated on FIELD_DEFINITION

    type User {
        id: ID!
        email: String!
        lists: [List]!
        token: String!
    }

    type Movie {
        id: ID!
        title: String!
        overview: String!
        backdrop_path: String
        poster_path: String
        popularity: Int
        vote_count: Int
        video: Boolean
        adult: Boolean
        original_title: String
        genre_ids: [Int]
        vote_average: Int
        release_date: String
    }

    type List {
        id: Int!
        name: String!
        movies: [Movie]!
        user: User!
    }

    input MoviesInput {
        page: Int
        query: String
    }

    input MovieInput {
        id: Int!
    }

    input AuthInput {
        email: String!
        password: String!
    }

    input CreateListInput {
        name: String!
    }

    input AddMovieToListInput {
        listId: Int!
        movieId: Int!
    }

    input ListInput {
        id: Int!
    }

    type Query {
        movies(input: MoviesInput!): [Movie!]!
        movie(input: MovieInput!): Movie!
        lists: [List!]! @authenticated
        list(input: ListInput!): List @authenticated
    }

    type Mutation {
        signup(input: AuthInput!): User!
        signin(input: AuthInput!): User!
        createList(input: CreateListInput!): List @authenticated
        addMovieToList(input: AddMovieToListInput!): List! @authenticated
    }
`;

export default typeDefs;
