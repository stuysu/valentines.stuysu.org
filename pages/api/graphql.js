import { ApolloServer, ForbiddenError } from 'apollo-server-micro';
import typeDefs from '../../graphql/typeDefs';
import resolvers from '../../graphql/resolvers';
import getJWTData from '../../utils/auth/getJWTData';
import User from '../../models/user';

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let user, signedIn, anonymousId;

        let jwt =
            req.cookies['auth-jwt'] ||
            req.headers['x-access-token'] ||
            req.headers['authorization'];

        if (jwt && jwt.startsWith('Bearer ')) {
            jwt = jwt.replace('Bearer ', '');
        }

        if (jwt) {
            const data = await getJWTData(jwt)

            if (data) {
                user = await User.findById(data.user.id);
                anonymousId = data.user.anonymousId;
            }

            signedIn = Boolean(user);
        }

        function authenticationRequired() {
            if (!signedIn) {
                throw new ForbiddenError(
                    'You must be signed in to use this endpoint'
                );
            }
        }

        return {
            user,
            signedIn,
            authenticationRequired,
            anonymousId,
        };
    },
    playground: {
        settings: {
            'schema.polling.enable': false,
            'request.credentials': 'same-origin',
            'prettier.useTabs': true,
        },
    },
    introspection: true,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default apolloServer.createHandler({
    path: '/api/graphql',
    disableHealthCheck: true,
});
