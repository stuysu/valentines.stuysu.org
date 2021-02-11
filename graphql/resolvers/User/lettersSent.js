import Letter from '../../../models/letter';

export default (userObj, args, { user, anonymousId }) => {
    if (userObj.id === user.id) {
        return Letter.find({ $or: [{ fromAnonymousId: anonymousId }, { fromEmail: user.email }] });
    }
};
