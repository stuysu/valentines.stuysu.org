import PerspectiveResult from '../../../models/perspectiveResult';
import ApiLimit from '../../../models/apiLimit';
import { ForbiddenError } from 'apollo-server-micro';

export default async (root, { message }, { authenticationRequired, user }) => {
    authenticationRequired();

    const cached = await PerspectiveResult.getCachedAnalysis(message);

    if (cached) {
        // Don't use the user's api limit
        return cached;
    }

    const frequentUse = await ApiLimit.userHasUsedInLastMinute(user.email);

    if (frequentUse) {
        throw new ForbiddenError(
            'You need to wait at least a minute after analyzing a message before you can analyze another one.'
        );
    }

    const analysis = await PerspectiveResult.getAnalysis(message);

    await ApiLimit.recordApiUse(user.email);

    return analysis;
};
