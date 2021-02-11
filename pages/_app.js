import '../styles/globals.css';
import ApolloContext from '../comps/apollo/ApolloContext';

function MyApp({ Component, pageProps }) {
    return (
        <ApolloContext>
            <Component {...pageProps} />
        </ApolloContext>
    );
}

export default MyApp;
