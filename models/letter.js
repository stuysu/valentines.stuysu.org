import mongoose from './mongoose';

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
    toEmail: String,
    message: String,
    templateId: Schema.Types.ObjectId
});

const Letter = mongoose.models.Letter || mongoose.model('Letter', LetterSchema);

export default Letter;
