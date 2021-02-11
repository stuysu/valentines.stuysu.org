import { ApolloProvider } from '@apollo/client';
import useApolloClient from './useApolloClient';

const ApolloContext = ({ children }) => {
    const client = useApolloClient();

    return <ApolloProvider client={client} children={children} />;
};

export default ApolloContext;
