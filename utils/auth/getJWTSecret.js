import JWTSecret from '../../models/jwtSecret';

let entry = null;

const getJWTSecret = async () => {
    const now = new Date();
    const currentSecretIsValid = entry && entry.useUntil > now;

    if (!currentSecretIsValid) {
        entry = await JWTSecret.getCurrentSecret();

        if (!entry) {
            entry = await JWTSecret.generateNewSecret();
        }
    }

    return entry.secret;
};

export default getJWTSecret;
