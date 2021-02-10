import GoogleLogin from 'react-google-login';

export default function SignInButton() {
    const onSignIn = data => {
        const { tokenId, accessToken } = data;

        fetch(
            `/api/storeSecret?access_token=${accessToken}&id_token=${tokenId}`
        ).then(res => console.log(res.toString()));
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
        />
    );
}
