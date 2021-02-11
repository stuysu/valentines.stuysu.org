import React, { createContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import UnauthenticatedHome from '../home/UnauthenticatedHome';

const UserContext = createContext({ signedIn: false });

const QUERY = gql`
    query {
        authenticatedUser {
            id
            firstName
            lastName
            name
            email
            lettersSent {
                id
                to {
                    id
                    name
                    email
                    grade
                }
            }
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

    if (!user.signedIn) {
        return <UnauthenticatedHome />;
    }

    return <UserContext.Provider value={user} children={children} />;
};

export default UserContext;
