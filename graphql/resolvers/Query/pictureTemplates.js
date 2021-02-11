import PictureTemplate from '../../../models/pictureTemplate';

export default (root, args, { authenticationRequired }) => {
    authenticationRequired();

    return PictureTemplate.find();
};
