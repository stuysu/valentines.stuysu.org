import { gql } from 'apollo-server-micro';

export default gql`
    type Mutation {
        login(accessToken: String!): String!

        saveLetter(
            email: String!
            message: String!
            anonymous: Boolean!
            templateId: ObjectId!
        ): Letter
        
        sendThankYouMessage(message: String!, letterId: ObjectId!): Letter
        
        deleteLetter(letterId: ObjectId!): Boolean
    }
`;
