import Letter from '../../../models/letter';
import { ForbiddenError } from 'apollo-server-micro';

export default async (root, { letterId }, { authenticationRequired, user, anonymousId }) => {
    const letter = await Letter.findById(letterId);

    if (!letter) {
        throw new ForbiddenError('There is no letter with that id');
    }

    if (letter.fromEmail !== user.email && letter.fromAnonymousId !== anonymousId) {
        throw new ForbiddenError("You don't have permission to delete this letter");
    }

    await letter.remove();

    return true;
};
