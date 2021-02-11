import mongoose from './mongoose';
import findOneLoaderFactory from '../utils/dataloaders/findOneLoaderFactory';
import { randomBytes } from 'crypto';
import { google } from 'googleapis';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../constants';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    gradYear: Number,
    googleDriveAnonymityFileId: String,
});

UserSchema.statics.idLoader = findOneLoaderFactory('User');
UserSchema.statics.findByEmail = email => User.findOne({ email });

UserSchema.methods.getAnonymousId = async function (access_token) {
    const oAuth2Client = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET
    );
    oAuth2Client.setCredentials({ access_token });
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    // Means that a file was already generated and we can get its contents
    if (this.googleDriveAnonymityFileId) {
        try {
            const { data } = await drive.files.get({
                fileId: this.googleDriveAnonymityFileId,
                alt: 'media',
            });

            return data;
        } catch (e) {
            // If the request fails the user likely removed permissions and reinstated them
            // Nothing we can do besides generate a new anonymous id
        }
    }

    // Will resolve to a 32 character string
    const anonymousId = randomBytes(16).toString('hex');

    const fileMetadata = {
        name: 'anonymousId.txt',
        parents: ['appDataFolder'],
    };
    const media = {
        mimeType: 'text/plain',
        body: anonymousId,
    };

    const { data } = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
    });

    this.googleDriveAnonymityFileId = data.id;
    await this.save();

    return anonymousId;
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;

