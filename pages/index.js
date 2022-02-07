import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../comps/auth/UserContext';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import { Grid, useTheme, Link as StyledLink, TextField, IconButton } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import CardPreview from '../comps/ui/CardPreview';
import { ArrowBackIos, ArrowForwardIos, MailOutline } from '@material-ui/icons';

const THANKS_MUTATION = gql`
    mutation($letterId: ObjectId!, $message: String!) {
        sendThankYouMessage(letterId: $letterId, message: $message) {
            id
            thankYouMessage
        }
    }
`;

export default function Home() {
    const user = useContext(UserContext);
    const theme = useTheme();
    const [letterPointer, setLetterPointer] = useState(0);
    const [thanksMessage, setThanksMessage] = useState('');
    const [sendThanks, { data, loading }] = useMutation(THANKS_MUTATION);

    useEffect(() => {
        setThanksMessage(user.lettersReceived[letterPointer]?.thankYouMessage || '');
    }, [letterPointer]);

    const letter = user.lettersReceived[letterPointer];
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

                <Link href="/write-to/">
                    <Button
                        startIcon={<MailOutline />}
                        color={'secondary'}
                        variant={'outlined'}
                    >
                        Write A Letter!
                    </Button>
                </Link>

                <br />
                <h2>Letters You've received:</h2>
                {Boolean(letter) ? (<>
                    <CardPreview
                        message={letter.message}
                        url={letter.template.resource.url}
                        {...letter.template}
                    />
                    <br />

                    <br />
                    <Grid container justify={'center'} alignContent={'center'} alignItems={'center'}>
                        <Grid xs={2} style={{ textAlign: 'center' }}>
                            {letterPointer > 0 && (
                                <IconButton onClick={() => setLetterPointer(letterPointer - 1)}>
                                    <ArrowBackIos />
                                </IconButton>
                            )}
                        </Grid>

                        <Grid xs={4} style={{ textAlign: 'center' }}>
                            Letter {letterPointer + 1} of {user.lettersReceived.length}
                        </Grid>
                        <Grid xs={2} style={{ textAlign: 'center' }}>
                            {letterPointer < user.lettersReceived.length - 1 && (
                                <IconButton onClick={() => setLetterPointer(letterPointer + 1)}>
                                    <ArrowForwardIos />
                                </IconButton>
                            )}
                        </Grid>
                    </Grid>

                    <br />
                    {letter.anonymous && <p>From: Anonymous</p>}
                    {letter.from && (
                        <p>
                            From {letter.from.name} - {letter.from.email}
                        </p>
                    )}

                    <TextField
                        multiline
                        value={thanksMessage}
                        onChange={ev => setThanksMessage(ev.target.value)}
                        variant={'outlined'}
                        color={'primary'}
                        label={'Leave a thank you message'}
                        helperText={
                            <>
                                If the sender is anonymous, they won't be notified when you leave a
                                thank you message. <br />
                                They'll only see it if they open the site after you leave your message.
                            </>
                        }
                        rows={3}
                    />
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        onClick={() =>
                            sendThanks({
                                variables: {
                                    message: thanksMessage,
                                    letterId: letter.id,
                                },
                            })
                                .then(() => {
                                    alert(
                                        'Your thank you message has been sent! If the letter was not anonymous, the person will receive an email letting them know to check :)'
                                    );
                                    user.refetch();
                                })
                                .catch(er => alert(er.message))
                        }
                    >
                        Send Message
                    </Button>
                    <br />
                    <br />
                </>
                ) : (
                    <h2>
                        No letters yet...
                    </h2>
                )}
                {Boolean(user.lettersSent?.length) && (
                    <>
                        <h2>Letters you've written:</h2>
                        <Grid
                            container
                            alignItems={'center'}
                            justify={'center'}
                            alignContent={'center'}
                        >
                            {user.lettersSent.map(letter => (
                                <Grid
                                    xs={6}
                                    sm={4}
                                    style={{
                                        padding: '0.5rem',
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: '1rem',
                                            borderRadius: 10,
                                            border: `1px solid rgba(0, 0, 0, 0.1)`,
                                        }}
                                    >
                                        <p>
                                            To: {letter.to.name}
                                            <br />
                                            <span style={{ color: 'grey' }}>
                                                {letter.anonymous
                                                    ? '(anonymous)'
                                                    : '(identity was shared)'}
                                            </span>
                                            <br />
                                            <br />
                                            {letter.thankYouMessage && (
                                                <span style={{ color: 'grey' }}>
                                                    {letter.to.firstName} said:{' '}
                                                    {letter.thankYouMessage}
                                                </span>
                                            )}
                                        </p>
                                        <Link href={'/write-to/' + letter.to.id}>
                                            <Button variant={'outlined'} color={'secondary'}>
                                                View Letter
                                            </Button>
                                        </Link>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}

                <div style={{ margin: '1rem', textAlign: 'center' }}>
                    {window.localStorage.getItem('backgroundDisabled') === 'true' ? (
                        <p>
                            <StyledLink
                                href={'#'}
                                onClick={() =>
                                    window.localStorage.removeItem('backgroundDisabled') &
                                    window.location.reload()
                                }
                            >
                                Re-enable the background
                            </StyledLink>
                        </p>
                    ) : (
                        <p>
                            <StyledLink
                                href={'#'}
                                onClick={() =>
                                    window.localStorage.setItem('backgroundDisabled', 'true') &
                                    window.location.reload()
                                }
                            >
                                Background runs slow on your computer? <br />
                                Click here to disable it.
                            </StyledLink>
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
}
