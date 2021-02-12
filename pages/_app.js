import '../styles/globals.css';
import ApolloContext from '../comps/apollo/ApolloContext';
import { UserProvider } from '../comps/auth/UserContext';
import ThemeContext from '../comps/ui/ThemeContext';
import Head from 'next/head';
import Backdrop from '../comps/ui/Backdrop';

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <script src={'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js'} />
                <script src={'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js'} />
                <meta
                    property={'og:image'}
                    content={
                        'https://res.cloudinary.com/hoxqr9glj/image/upload/v1613031770/10_j2b7r7.png'
                    }
                />
                <meta
                    property={'og:description'}
                    content={"Send Valentin's day letters to your friends, even anonymously!"}
                />
            </Head>
            <Backdrop />

            <ThemeContext>
                <ApolloContext>
                    <UserProvider>
                        <Component {...pageProps} />
                    </UserProvider>
                </ApolloContext>
            </ThemeContext>
        </div>
    );
}

export default MyApp;
