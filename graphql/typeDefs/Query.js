import { gql } from 'apollo-server-micro';

export default gql`
    type Query {
        # Returns the current user if authentication is provided (is signed in), otherwise returns null
        authenticatedUser: User
        
        # Return the top 15 users that match the search keyword
        searchUsers(keyword: String!): [User]
    }
`;
