import User from '../../../models/user';

export default letter => User.emailLoader.load(letter.toEmail);