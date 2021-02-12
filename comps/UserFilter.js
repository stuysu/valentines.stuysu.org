import { useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import {
    CircularProgress,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Create, MailOutline } from '@material-ui/icons';
import UserContext from './auth/UserContext';
import Link from 'next/link';

const SEARCH_QUERY = gql`
    query($keyword: String!) {
        searchUsers(keyword: $keyword) {
            id
            name
            email
            grade
        }
    }
`;

const UserFilter = () => {
    const [keyword, setKeyword] = useState('');
    const { data, loading } = useQuery(SEARCH_QUERY, {
        variables: { keyword },
    });
    const authUser = useContext(UserContext);

    return (
        <div style={{ width: '90%' }}>
            <TextField
                value={keyword}
                onChange={ev => setKeyword(ev.target.value)}
                label={'Find Person'}
                variant={'outlined'}
                color={'primary'}
                fullWidth
            />

            <div
                style={{
                    height: 400,
                    borderRadius: 10,
                    background: 'rgba(0, 0, 0, 0.05)',
                    overflow: 'auto',
                }}
            >
                {!keyword && (
                    <p style={{ textAlign: 'center', color: 'grey', padding: '3rem' }}>
                        Start typing to find your friends
                    </p>
                )}
                {keyword && loading && (
                    <div style={{ width: '100%', textAlign: 'center', padding: '3rem' }}>
                        <CircularProgress />
                    </div>
                )}
                {keyword && data && (
                    <List>
                        {data.searchUsers.map(user => (
                            <ListItem>
                                <ListItemText
                                    primary={user.name}
                                    secondary={
                                        <>
                                            {user.email}
                                            <br />{user.grade}th grade
                                        </>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <Link href={'/write-to/' + user.id}>
                                        {authUser.lettersSent.some(
                                            letter => letter.to.id === user.id
                                        ) ? (
                                            <Button
                                                startIcon={<Create />}
                                                color={'primary'}
                                                variant={'outlined'}
                                            >
                                                Edit{' '}
                                            </Button>
                                        ) : (
                                            <Button
                                                startIcon={<MailOutline />}
                                                color={'secondary'}
                                                variant={'outlined'}
                                            >
                                                Write
                                            </Button>
                                        )}
                                    </Link>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                )}
            </div>
        </div>
    );
};

export default UserFilter;
