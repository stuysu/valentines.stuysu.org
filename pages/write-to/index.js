import React, { useEffect } from 'react';
import styles from './../../styles/Home.module.css';
import UserFilter from '../../comps/UserFilter';
import { useTheme } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
const WriteTo = () => {
    const theme = useTheme();
    const router = useRouter();

    useEffect(() => router.push('/'));

    return (
        <div className={styles.container} style={{ minHeight: '100vh' }}>
            <main className={styles.main}>
                <Link href={'/'}>
                    <Button variant={'outlined'}>
                        <ArrowBackIos /> Back To Home
                    </Button>
                </Link>
                <h1
                    className={styles.title}
                    style={{ color: theme.palette.secondary.main, margin: '2rem' }}
                >
                    Send A Letter
                </h1>

                <UserFilter />
            </main>
        </div>
    );
};

export default WriteTo;
