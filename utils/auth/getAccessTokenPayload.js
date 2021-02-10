import { google } from 'googleapis';

export default async function getAccessTokenPayload(access_token) {
    try {
        const { data } = await google.oauth2('v2').tokeninfo({ access_token });

        return data;
    } catch (e) {
        return null;
    }
}
