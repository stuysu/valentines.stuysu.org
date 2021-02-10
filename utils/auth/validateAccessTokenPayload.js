import { ApolloError, ForbiddenError } from 'apollo-server-micro';
import { GOOGLE_CLIENT_ID } from '../../constants';

export default function validateAccessTokenPayload(payload) {
    if (!payload) {
        throw new ForbiddenError('That access token is not valid.');
    }

    if (
        payload.issued_to !== GOOGLE_CLIENT_ID ||
        payload.audience !== GOOGLE_CLIENT_ID
    ) {
        throw new ForbiddenError(
            'That id token was not generated for this app.'
        );
    }

    if (!payload.verified_email) {
        throw new ForbiddenError(
            'That email is not verified and cannot be used to authenticate.'
        );
    }

    if (! payload.email.endsWith('@stuy.edu')) {
        throw new ForbiddenError(
            'That email address does not belong to the stuy.edu organization and cannot be used to authenticate.'
        );
    }

    if (
        !payload.scope.includes(
            'https://www.googleapis.com/auth/drive.appdata'
        )
    ) {
        throw new ApolloError(
            'You need to allow this application to store its configuration data in your Google Drive in order for the anonymity to work.',
            'GOOGLE_DRIVE_REQUIRED'
        );
    }
}
