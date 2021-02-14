import User from '../../../models/user';

export default (letter, args, { authenticationRequired, user }) => {
    authenticationRequired();

    if (letter.toEmail === user.email && letter.fromEmail) {
        return User.emailLoader.load(letter.fromEmail);
    }
};
