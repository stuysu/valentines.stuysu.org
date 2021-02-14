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
        lettersSent: [Letter!]
        lettersReceived: [Letter!]
        
        # If the user that's signed in sent this user a letter, then this field will have that
        letterFromAuthenticatedUser: Letter
    }
`;
