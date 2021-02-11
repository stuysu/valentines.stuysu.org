import Letter from '../../../models/letter';

export default async (userObj, args, { authenticationRequired, user, anonymousId }) => {
    authenticationRequired();
    const userObjLetters = await Letter.toEmailLoader.load(userObj.email);

    return userObjLetters.find(
        letter => letter.fromEmail === user.email || letter.fromAnonymousId === anonymousId
    );
};
