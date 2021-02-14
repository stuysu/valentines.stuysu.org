import Letter from '../../../models/letter';

export default (letter, args, { user, anonymousId }) => {
    if (
        letter.toEmail === user.email ||
        letter.fromAnonymousId === anonymousId ||
        letter.fromEmail === user.email
    ) {
        return letter.thankYouMessage;
    }
};
