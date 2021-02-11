import GoogleLogin from 'react-google-login';
import { gql, useMutation } from '@apollo/client';
import { setAuthToken } from '../apollo/useApolloClient';

const LOGIN_MUTATION = gql`
    mutation($accessToken: String!) {
        login(accessToken: $accessToken)
    }
`;

export default function SignInButton() {
    const [login, { loading }] = useMutation(LOGIN_MUTATION);

    const onSignIn = async data => {
        const { accessToken } = data;

        try {
            const { data } = await login({ variables: { accessToken } });
            localStorage.setItem('auth-jwt', data.login);
            setAuthToken(data.login);
        } catch (er) {
            alert(er.message);
        }
    };

    return (
        <GoogleLogin
            clientId={
                process.env.NEXT_APP_GOOGLE_CLIENT_ID ||
                '17810665650-cfogu9uflc4fsuk3un0r5jv0pj2maffp.apps.googleusercontent.com'
            }
            buttonText='Login'
            onSuccess={onSignIn}
            onFailure={console.log}
            cookiePolicy={'single_host_origin'}
            hostedDomain={'stuy.edu'}
            scope={
                'https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/drive.appdata'
            }
            disabled={loading}
        />
    );
}
