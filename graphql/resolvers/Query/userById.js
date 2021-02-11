import User from '../../../models/user';

export default (root, { id }, { authenticationRequired }) => {
    authenticationRequired();

    return User.findById(id);
};
