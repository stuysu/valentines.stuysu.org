import '../styles/globals.css';
import ApolloContext from '../comps/apollo/ApolloContext';
import { UserProvider } from '../comps/auth/UserContext';
import ThemeContext from '../comps/ui/ThemeContext';
import Head from 'next/head';
import Backdrop from '../comps/ui/Backdrop';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];

            if (!window.gtag) {
                window.gtag = function () {
                    dataLayer.push(arguments);
                };
                window.gtag('config', 'G-WMGHQW1290');
            }
            window.gtag('js', new Date());
        }
    }, [router.pathname]);

    return (
        <div>
            <Head>
                <script async src='https://www.googletagmanager.com/gtag/js?id=G-WMGHQW1290' />
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
                    content={"Send Valentine's day letters to your friends, even anonymously!"}
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
