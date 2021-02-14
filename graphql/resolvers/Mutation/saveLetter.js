import Letter from '../../../models/letter';
import PerspectiveResult from '../../../models/perspectiveResult';
import ApiLimit from '../../../models/apiLimit';
import { ForbiddenError } from 'apollo-server-micro';

export default async (
    root,
    { email, message, anonymous, templateId },
    { authenticationRequired, user, anonymousId }
) => {
    authenticationRequired();

    throw new ForbiddenError('Changes to letters are no longer allowed.');

    let analysis = await PerspectiveResult.getCachedAnalysis(message);

    if (!analysis) {
        const frequentUse = await ApiLimit.userHasUsedInLastMinute(user.email);

        if (frequentUse) {
            throw new ForbiddenError(
                'You need to wait at least thirty seconds after each save attempt.'
            );
        }

        analysis = await PerspectiveResult.getAnalysis(message);

        await ApiLimit.recordApiUse(user.email);
    }

    if (!analysis.isSafe) {
        throw new ForbiddenError(
            'Your message was flagged as having possible threatening or toxic language. Please change it before continuing.'
        );
    }

    let entry = await Letter.findOne({
        toEmail: email,
        $or: [{ fromAnonymousId: anonymousId }, { fromEmail: user.email }],
    });

    if (!entry) {
        // Count how many rows they made in the last hour
        const now = new Date();
        const numCreatedInLastHour = await Letter.countDocuments({
            $or: [{ fromAnonymousId: anonymousId }, { fromEmail: user.email }],
            createdAt: { $gt: new Date(now.getTime() - 30 * 60 * 1000) },
        });

        if (numCreatedInLastHour >= 20) {
            throw new ForbiddenError(
                'You are only allowed to create 20 new letters per thirty minutes. Please wait some time before trying again.'
            );
        }

        entry = await Letter.create({
            toEmail: email,
            createdAt: now,
        });
    }

    if (anonymous) {
        entry.fromEmail = null;
        entry.fromAnonymousId = anonymousId;
    } else {
        entry.fromAnonymousId = null;
        entry.fromEmail = user.email;
    }

    entry.message = message;
    entry.templateId = templateId;

    entry.anonymous = anonymous;

    await entry.save();

    return entry;
};
