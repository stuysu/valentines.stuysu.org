import { gql } from 'apollo-server-micro';

export default gql`
    type Letter {
        id: ObjectId!
        anonymous: Boolean!
        fromEmail: String
        public: Boolean
        to: User
        message: String
        template: PictureTemplate
    }
`;
