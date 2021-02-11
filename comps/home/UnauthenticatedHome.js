import React from 'react';
import styles from '../../styles/Home.module.css';
import SignInButton from '../auth/SignInButton';
import { useTheme } from '@material-ui/core';
import Head from 'next/head';

const UnauthenticatedHome = () => {
    const theme = useTheme();

    return (
        <div className={styles.container}>
            <Head>
                <title>Home | StuySU Valentines Letters</title>
            </Head>

            <main className={styles.main}>
                <h1
                    className={styles.title}
                    style={{ color: theme.palette.secondary.main, margin: '2rem' }}
                >
                    Valentine Letters
                </h1>
                <SignInButton />
            </main>
        </div>
    );
};

export default UnauthenticatedHome;
