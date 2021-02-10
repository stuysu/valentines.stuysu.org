import { gql } from 'apollo-server-micro';

export default gql`
    type User {
        id: ObjectId!
        firstName: String
        lastName: String
        email: String
        name: String
        gradYear: Int
        grade: String
    }
`;
