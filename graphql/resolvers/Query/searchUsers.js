import User from '../../../models/user';

const escapeStringRegexp = require('escape-string-regexp');

export default (root, { keyword }, { authenticationRequired }) => {
    authenticationRequired();

    const words = keyword.split(/\s/g);

    const $and = words.map(word => {
        const $regex = escapeStringRegexp(word);

        return {
            $or: [
                { firstName: { $regex } },
                { lastName: { $regex } },
                { email: { $regex } },
            ],
        };
    });

    return User.find({ $and }, null, { limit: 15 });
};
