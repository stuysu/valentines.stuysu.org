import React, { useContext } from 'react';
import styles from '../../styles/Home.module.css';
import Head from 'next/head';
import SignInButton from '../auth/SignInButton';
import UserFilter from '../UserFilter';
import UserContext from '../auth/UserContext';
import { useTheme } from '@material-ui/core';

const UserHome = () => {
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
                    style={{ color: theme.palette.secondary.main, margin: '2rem' }}
                >
                    Welcome back,{' '}
                    <span style={{ color: theme.palette.primary.main }}>{user.firstName}</span>
                </h1>

                <UserFilter />
            </main>
        </div>
    );
};

export default UserHome;
