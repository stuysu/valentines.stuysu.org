import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation, useQuery } from '@apollo/client';
import styles from './../../styles/Home.module.css';
import {
    CircularProgress,
    FormControlLabel,
    Grid,
    Switch,
    TextField,
    useTheme,
} from '@material-ui/core';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import { ArrowBackIos } from '@material-ui/icons';
import CardPreview from '../../comps/ui/CardPreview';

const USER_QUERY = gql`
    query($userId: ObjectId!) {
        userById(id: $userId) {
            id
            name
            email
            letterFromAuthenticatedUser {
                id
                anonymous
                message
                thankYouMessage
                template {
                    id
                    offset {
                        top
                        left
                        right
                        bottom
                    }
                    textColor
                    backgroundColor
                    variant
                    resource {
                        url
                    }
                }
                to {
                    firstName
                }
            }
        }
        pictureTemplates {
            id
            offset {
                top
                bottom
                left
                right
            }
            backgroundColor
            textColor
            variant
            resource {
                url
            }
        }
    }
`;

const SAVE_MUTATION = gql`
    mutation($message: String!, $email: String!, $anonymous: Boolean!, $templateId: ObjectId!) {
        saveLetter(
            message: $message
            templateId: $templateId
            email: $email
            anonymous: $anonymous
        ) {
            id
        }
    }
`;

const DELETE_MUTATION = gql`
    mutation($letterId: ObjectId!) {
        deleteLetter(letterId: $letterId)
    }
`;

const WriteToUser = () => {
    const router = useRouter();
    const { userId } = router.query;
    const { data, loading, error } = useQuery(USER_QUERY, { variables: { userId } });
    const theme = useTheme();

    const [save] = useMutation(SAVE_MUTATION);

    const [deleteLetter] = useMutation(DELETE_MUTATION);

    const [message, setMessage] = useState('');
    const [template, setTemplate] = useState(null);
    const [anonymous, setAnonymous] = useState(false);

    useEffect(() => {
        if (data?.userById?.letterFromAuthenticatedUser) {
            setMessage(data?.userById?.letterFromAuthenticatedUser.message);
            setTemplate(data?.userById?.letterFromAuthenticatedUser.template);
            setAnonymous(data?.userById?.letterFromAuthenticatedUser.anonymous);
        }
    }, [data]);

    if (loading) {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <CircularProgress />
                </main>
            </div>
        );
    }

    if ((!loading && error) || (!loading && !data?.userById)) {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 style={{ color: theme.palette.secondary.main }}>
                        There's no user with that id.
                    </h1>
                    <Link href={'/'}>
                        <Button variant={'outlined'}>Back To Home</Button>
                    </Link>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Link href={'/write-to'}>
                    <Button variant={'outlined'}>
                        <ArrowBackIos />
                        Back To Search
                    </Button>
                </Link>
                <h1 style={{ color: theme.palette.secondary.main }}>
                    Write Letter To: {data.userById.name}
                </h1>
                <TextField
                    value={message}
                    onChange={ev => setMessage(ev.target.value)}
                    multiline
                    rows={message.split('\n').length < 4 ? 4 : message.split('\n').length}
                    fullWidth
                    label={'Letter'}
                    variant={'outlined'}
                />
                <br />
                <br />
                <FormControlLabel
                    control={
                        <Switch checked={anonymous} onChange={() => setAnonymous(!anonymous)} />
                    }
                    label='Send Anonymously'
                />
                <br />
                <br />

                <h3>Select A Template:</h3>
                <Grid container style={{ maxWidth: 1200, width: '90vw' }} spacing={5}>
                    {data.pictureTemplates.map(picTemplate => (
                        <Grid xs={2} md={1}>
                            <img
                                style={{
                                    width: '100%',
                                    objectFit: 'contain',
                                    padding: '0.5rem',
                                    border:
                                        template?.id === picTemplate.id
                                            ? '10px solid #50C878'
                                            : 'none',
                                    cursor: 'pointer',
                                }}
                                src={picTemplate.resource.url}
                                onClick={() => setTemplate(picTemplate)}
                            />
                        </Grid>
                    ))}
                </Grid>

                {template && (
                    <>
                        <h3>Preview</h3>
                        <CardPreview message={message} url={template.resource.url} {...template} />
                    </>
                )}

                <br />
                <br />

                <Button
                    variant={'contained'}
                    color={'primary'}
                    disabled={!message || !template}
                    onClick={() =>
                        save({
                            variables: {
                                message,
                                templateId: template.id,
                                email: data.userById.email,
                                anonymous,
                            },
                        })
                            .then(res => {
                                window.alert(
                                    "Your letter has been saved. You may come back here and edit it any time before Valentine's day."
                                );

                                window.location.replace('/');
                            })
                            .catch(er => {
                                window.alert(er.message);
                            })
                    }
                >
                    {data?.userById?.letterFromAuthenticatedUser ? 'Save' : 'Submit'} Letter
                </Button>

                <br />
                {data?.userById?.letterFromAuthenticatedUser && (
                    <Button
                        variant={'outlined'}
                        color={'secondary'}
                        onClick={() =>
                            window.confirm(
                                'Are you sure you want to delete this letter? This cannot be undone.'
                            ) &&
                            deleteLetter({
                                variables: {
                                    letterId: data.userById.letterFromAuthenticatedUser.id,
                                },
                            })
                                .then(() => {
                                    window.alert('Your letter has been successfully deleted');
                                    window.location.replace('/');
                                })
                                .catch(er => window.alert(er.message))
                        }
                    >
                        Delete Letter
                    </Button>
                )}
            </main>
        </div>
    );
};

const ViewMessage = () => {
    const router = useRouter();
    const { data, loading, error } = useQuery(USER_QUERY, {
        variables: { userId: router.query.userId },
    });
    const theme = useTheme();

    if (loading) {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <CircularProgress />
                </main>
            </div>
        );
    }

    if ((!loading && error) || (!loading && !data?.userById)) {
        return (
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 style={{ color: theme.palette.secondary.main }}>
                        There's no user with that id.
                    </h1>
                    <Link href={'/'}>
                        <Button variant={'outlined'}>Back To Home</Button>
                    </Link>
                </main>
            </div>
        );
    }

    if (!data?.userById?.letterFromAuthenticatedUser) {
        return (
            <div className={styles.container}>
                <main className={styles.main}>  
                    <Link href={'/write-to'}>
                        <Button variant={'outlined'}>
                            <ArrowBackIos />
                            Back To Search
                        </Button>
                    </Link>
                    <h1 style={{ color: theme.palette.secondary.main }}>
                        You haven't sent a letter to this person
                    </h1>
                </main>
            </div>
        );
    }

    const letter = data?.userById?.letterFromAuthenticatedUser;
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <Link href={'/'}>
                    <Button variant={'outlined'}>
                        <ArrowBackIos />
                        Back To Home
                    </Button>
                </Link>
                <h1 style={{ color: theme.palette.secondary.main }}>
                    Your Letter To: {data.userById.name}
                </h1>

                <CardPreview
                    message={letter.message}
                    url={letter.template.resource.url}
                    {...letter.template}
                />
                <br />
                <br />
                {letter.thankYouMessage && (
                    <>
                        <h3>{letter.to.firstName} said thanks:</h3>
                        <p>{letter.thankYouMessage}</p>
                    </>
                )}
            </main>
        </div>
    );
};

export default ViewMessage;
