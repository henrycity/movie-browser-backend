import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

import typeDefs from './typedefs';
import resolvers from './resolvers';
import models from './models';
import { AuthenticationDirective } from './directives';
import { verifyToken, newToken } from './utils/auth';
import { sequelize } from './utils/sequelize';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
        authenticated: AuthenticationDirective,
    },
    context({ req }) {
        const token = req.headers.authorization ?? '';
        const { id: userId } = verifyToken(token);
        return { models, newToken, axios, userId };
    },
});

sequelize.sync().then(() => {
    server.listen(4000).then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
});
