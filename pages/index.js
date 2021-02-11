import React, { useContext } from 'react';
import UserContext from '../comps/auth/UserContext';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import { Grid, useTheme } from '@material-ui/core';

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
                <br />
                <br />

                {Boolean(user.lettersSent?.length) && (
                    <>
                        <h2>Letters you've written:</h2>
                        <Grid container>
                            {user.lettersSent.map(letter => (
                                <Grid
                                    xs={4}
                                    style={{
                                        padding: '2rem',
                                        borderRadius: 10,
                                        border: `1px solid rgba(0, 0, 0, 0.1)`,
                                    }}
                                >
                                    <p>To: {letter.to.name}</p>
                                    <Link href={'/write-to/' + letter.to.id}>
                                        <Button variant={'outlined'} color={'secondary'}>
                                            Edit Letter
                                        </Button>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </main>
        </div>
    );
}
