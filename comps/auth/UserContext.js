import { createContext } from 'react';
import { gql, useQuery } from '@apollo/client';

const UserContext = createContext({ signedIn: false });

const QUERY = gql`
    query {
        authenticatedUser {
            id
            firstName
            lastName
            name
            email
        }
    }
`;

export const UserProvider = ({ children }) => {
    const { data, refetch } = useQuery(QUERY);

    const user = { signedIn: false, refetch };

    if (data && data.authenticatedUser) {
        user.signedIn = true;

        Object.assign(user, data.authenticatedUser);
    }

    return <UserContext.Provider value={user} children={children} />;
};

export default UserContext;
