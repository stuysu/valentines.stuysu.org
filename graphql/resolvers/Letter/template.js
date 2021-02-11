import PictureTemplate from '../../../models/pictureTemplate';

export default letter => PictureTemplate.idLoader.load(letter.templateId);
