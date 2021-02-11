import mongoose from './mongoose';
import findOneLoaderFactory from '../utils/dataloaders/findOneLoaderFactory';
import findManyLoaderFactory from '../utils/dataloaders/findManyLoaderFactory';

const Schema = mongoose.Schema;

// A safeguard against people spamming the perspective api endpoint
const LetterSchema = new Schema({
    fromEmail: {
        type: String,
        required: false,
    },
    fromAnonymousId: {
        type: String,
        required: false,
    },
    anonymous: Boolean,
    toEmail: String,
    message: String,
    templateId: Schema.Types.ObjectId,
    createdAt: Date
});

LetterSchema.statics.idLoader = findOneLoaderFactory('Letter');
LetterSchema.statics.toEmailLoader = findManyLoaderFactory('Letter', 'toEmail');

const Letter = mongoose.models.Letter || mongoose.model('Letter', LetterSchema);

export default Letter;
