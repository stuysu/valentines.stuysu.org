import React, { useContext } from 'react';
import UserContext from '../comps/auth/UserContext';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
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
                    style={{ color: theme.palette.secondary.main, margin: '2rem', marginBottom: 0 }}
                >
                    Welcome back,{' '}
                    <span style={{ color: theme.palette.primary.main }}>{user.firstName}</span>
                </h1>
                <p style={{ textAlign: 'center' }}>
                    Not {user.firstName}?{' '}
                    <a
                        href={'#'}
                        style={{
                            color: theme.palette.secondary.light,
                            textDecoration: 'underline',
                            marginTop: 0,
                        }}
                        onClick={() => window.localStorage.clear() & window.location.reload()}
                    >
                        Sign Out.
                    </a>
                </p>

                <Link href={'/write-to'}>
                    <Button variant={'outlined'} style={{ margin: '2rem' }}>
                        Send a Letter
                    </Button>
                </Link>
            </main>
        </div>
    );
}
