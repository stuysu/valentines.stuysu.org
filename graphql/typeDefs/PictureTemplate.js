import { gql } from 'apollo-server-micro';

export default gql`
    type PictureTemplateOffset {
        left: Float
        right: Float
        top: Float
        bottom: Float
    }

    type PictureTemplate {
        id: ObjectId!
        offset: PictureTemplateOffset
        backgroundColor: String
        textColor: String
        variant: String
        resource: CloudinaryResource
    }
`;
