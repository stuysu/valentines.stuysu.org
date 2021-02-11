import '../styles/globals.css';
import ApolloContext from '../comps/apollo/ApolloContext';
import { UserProvider } from '../comps/auth/UserContext';
import ThemeContext from '../comps/ui/ThemeContext';
import Head from 'next/head';
import Backdrop from '../comps/ui/Backdrop';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeContext>
            <Head>
                <script src={'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js'} />
                <script src={'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js'} />
            </Head>
            <Backdrop />
            <ApolloContext>
                <UserProvider>
                    <Component {...pageProps} />
                </UserProvider>
            </ApolloContext>
        </ThemeContext>
    );
}

export default MyApp;
