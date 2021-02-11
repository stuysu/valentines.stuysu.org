import mongoose from './mongoose';

const Schema = mongoose.Schema;

// A safeguard against people spamming the perspective api endpoint
const MessageSchema = new Schema({
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
});

const Message =
    mongoose.models.Message || mongoose.model('Message', MessageSchema);

export default Message;
