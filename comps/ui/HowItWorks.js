import React from 'react';
import { Link, List, ListItem, ListItemText, useTheme } from '@material-ui/core';

const HowItWorks = () => {
    const theme = useTheme();

    return (
        <div style={{ margin: '2rem', width: '95%', maxWidth: 800 }}>
            <h1
                style={{
                    color: theme.palette.secondary.main,
                    marginBottom: 0,
                    textAlign: 'center',
                }}
            >
                First Things First:
            </h1>

            <List>
                <ListItem>
                    <ListItemText
                        primary={
                            <h3 style={{ color: theme.palette.primary.main }}>
                                Why is it asking for my Google Drive?
                            </h3>
                        }
                        secondary={
                            <p>
                                Uhh... next question please. (Just kidding!)
                                <br />
                                <br />
                                One of the features of this app is that you're able to send letters
                                to your friends anonymously. When you first sign in, an anonymous id
                                is generated for you. This id is then stored in your Google drive in
                                what's called an AppData folder specific to this app. The
                                permissions that we request only give us access to create files in
                                this folder and nothing else. Neither the app, or anyone on SU is
                                able to see any other files you have in your drive. You can learn
                                more about the permissions here:{' '}
                                <Link
                                    href={'https://developers.google.com/drive/api/v3/appdata'}
                                    target={'_blank'}
                                >
                                    Store Application Specific Data
                                </Link>
                                <br />
                                <br />
                                After a successful login, we store your email and anonymous id in
                                something called a{' '}
                                <Link href={'https://jwt.io'} target={'_blank'}>
                                    JSON Web Token
                                </Link>
                                . This lets you securely provide us your anonymous id when you want
                                to write a letter anonymously but also means your anonymous id and
                                email address are never stored together in our database, hence no
                                way to know who an anonymous id belongs to.
                                <br />
                                <br />
                                This also means that if you uninstall the app from your Google
                                account you will{' '}
                                <b>
                                    lose the ability to edit letters you had previously sent out
                                    anonymously!
                                </b>
                            </p>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <h3 style={{ color: theme.palette.primary.main }}>
                                I got an error saying that my letter was flagged?
                            </h3>
                        }
                        secondary={
                            <p>
                                To help ensure a positive environment, all letters go through a risk
                                analysis that scores the letter on a few attributes like toxicity,
                                threat, insult, and sexually explicit. If your letter gets a high
                                score on any of these categories you must change it before it can be
                                sent.
                                <br />
                                <br />
                                The API that we use is called Perspective and you can learn more
                                about it here:{' '}
                                <Link href={'https://www.perspectiveapi.com/'} target={'_blank'}>
                                    https://www.perspectiveapi.com/
                                </Link>
                            </p>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary={
                            <h3 style={{ color: theme.palette.primary.main }}>
                                How do I see letters people have sent me?
                            </h3>
                        }
                        secondary={
                            <p>
                                Letters addressed to individuals will be available to them at noon
                                on Valentine's day. You may edit any letters you send out up until
                                then. You'll also have the opportunity to leave a thank you message
                                for anyone who sent you a letter.
                            </p>
                        }
                    />
                </ListItem>

                <ListItem>
                    <ListItemText
                        primary={
                            <h3 style={{ color: theme.palette.primary.main }}>
                                I'm interested in the code for this
                            </h3>
                        }
                        secondary={
                            <p>
                                The code for this app is publicly available on the StuySU GitHub
                                account. You can see the repository for this app here:{' '}
                                <Link
                                    href={'https://github.com/stuysu/valentines-messages'}
                                    target={'_blank'}
                                >
                                    https://github.com/stuysu/valentines-messages
                                </Link>
                                <br />
                                <br />
                                Our stack consists consists of{' '}
                                <Link href={'https://reactjs.org'} target={'_blank'}>
                                    React.JS
                                </Link>
                                ,{' '}
                                <Link href={'https://nextjs.org'} target={'_blank'}>
                                    Next.JS
                                </Link>
                                ,{' '}
                                <Link href={'https://www.apollographql.com/'} target={'_blank'}>
                                    Apollo GraphQL
                                </Link>
                                ,{' '}
                                <Link href={'https://mongodb.com'} target={'_blank'}>
                                    MongoDB
                                </Link>
                                , and{' '}
                                <Link href={'https://cloudinary.com'} target={'_blank'}>
                                    Cloudinary
                                </Link>
                            </p>
                        }
                    />
                </ListItem>

                <ListItem>
                    <ListItemText
                        primary={
                            <h3 style={{ color: theme.palette.primary.main }}>
                                I have another issue/question
                            </h3>
                        }
                        secondary={
                            <p>
                                We're always available at{' '}
                                <Link href={'mailto:it@stuysu.org'}>it@stuysu.org</Link> to answer
                                any of your questions or help you out.
                            </p>
                        }
                    />
                </ListItem>
            </List>
        </div>
    );
};

export default HowItWorks;
