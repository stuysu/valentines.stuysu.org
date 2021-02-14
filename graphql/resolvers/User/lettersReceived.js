import Letter from '../../../models/letter';

export default (userObj, args, { user }) => {
    if (userObj.id === user.id) {
        return Letter.find({ toEmail: user.email });
    }
};
