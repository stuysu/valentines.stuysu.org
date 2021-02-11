import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';

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

    return (
        <div style={{width: "90%"}}>
            <TextField
                value={keyword}
                onChange={ev => setKeyword(ev.target.value)}
                label={'Search Users'}
                variant={'outlined'}
                color={'primary'}
                fullWidth
            />

            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default UserFilter;
