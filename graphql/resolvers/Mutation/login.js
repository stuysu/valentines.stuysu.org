import { ApolloError, ForbiddenError } from 'apollo-server-micro';
import User from '../../../models/user';
import fieldsCannotBeEmpty from '../../../utils/user-input/fieldsCannotBeEmpty';
import getAccessTokenPayload from '../../../utils/auth/getAccessTokenPayload';
import validateAccessTokenPayload from '../../../utils/auth/validateAccessTokenPayload';
import getJWTSecret from '../../../utils/auth/getJWTSecret';
import { sign } from 'jsonwebtoken';

export default async (mutation, { accessToken }, { signedIn }) => {
    if (signedIn) {
        throw new ForbiddenError('You are already signed in.');
    }

    fieldsCannotBeEmpty({ accessToken });

    const payload = await getAccessTokenPayload(accessToken);
    validateAccessTokenPayload(payload);

    const user = await User.findByEmail(payload.email);

    if (!user) {
        throw new ApolloError(
            `You're not in the database. Send an email to it@stuysu.org and we'll sort this out.`,
            'NOT_IN_DATABASE'
        );
    }

    const anonymousId = await user.getAnonymousId(accessToken);

    const { id, email, firstName, lastName } = user;

    const tokenData = {
        user: {
            id,
            email,
            firstName,
            lastName,
            anonymousId,
        },
    };

    const secret = await getJWTSecret();

    return sign(tokenData, secret, { expiresIn: '30d' });
};
