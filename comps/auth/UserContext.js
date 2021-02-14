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
            lettersReceived {
                id
                anonymous
                message
                from {
                    id
                    email
                    name
                }
                thankYouMessage
                template {
                    id
                    offset {
                        top
                        left
                        right
                        bottom
                    }
                    textColor
                    backgroundColor
                    variant
                    resource {
                        url
                    }
                }
            }
            
            lettersSent {
                id
                thankYouMessage
                to {
                    id
                    name
                    firstName
                    email
                    grade
                }
                anonymous
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
