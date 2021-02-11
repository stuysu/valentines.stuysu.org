import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SignInButton from '../comps/auth/SignInButton';
import { useContext } from 'react';
import UserContext from '../comps/auth/UserContext';
import UserFilter from '../comps/UserFilter';
import { useTheme } from '@material-ui/core';

export default function Home() {
    const user = useContext(UserContext);
    const theme = useTheme();

    return (
        <div className={styles.container}>
            <Head>
                <title>Home | StuySU Valentines Letters</title>
            </Head>

            <main className={styles.main}>
                <h1
                    className={styles.title}
                    style={{ color: theme.palette.secondary.main, margin: "2rem" }}
                >
                    Welcome back,{' '}
                    <span style={{ color: theme.palette.primary.main }}>
                        {user.firstName}
                    </span>
                </h1>

                {!user.signedIn && <SignInButton />}
                {user.signedIn && <UserFilter />}
            </main>
        </div>
    );
}
