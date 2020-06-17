import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server';
import { defaultFieldResolver, GraphQLField } from 'graphql';

export class AuthenticationDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: GraphQLField<any, any>) {
        const resolver = field.resolve || defaultFieldResolver;
        field.resolve = async (root, args, ctx, info) => {
            if (!ctx.userId) {
                throw new AuthenticationError('Please log in');
            } else {
                return resolver(root, args, ctx, info);
            }
        };
    }
}
