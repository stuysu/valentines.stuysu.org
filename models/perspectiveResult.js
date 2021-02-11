import mongoose from './mongoose';
import sha256 from '../utils/crypto/sha256';
import analyzeMessage from '../utils/google/analyzeMessage';

const Schema = mongoose.Schema;

// A safeguard against people spamming the perspective api endpoint
const PerspectiveResultSchema = new Schema({
    messageHash: String,
    isSafe: Boolean,
    riskScores: {
        attack: Number,
        threat: Number,
        insult: Number,
        sexuallyExplicit: Number,
        toxicity: Number,
    },
});

// If it hasn't been at least a minute since the last time the user tried to use
// the endpoint, return true. Else return false.
PerspectiveResultSchema.statics.getAnalysis = async message => {
    const messageHash = sha256(message);

    const model = mongoose.model('PerspectiveResult');
    const cachedResults = await model.findOne({ messageHash });

    if (cachedResults) {
        return cachedResults;
    }

    const riskScores = await analyzeMessage(message);
    const fields = [
        'attack',
        'threat',
        'insult',
        'sexuallyExplicit',
        'toxicity',
    ];

    const isSafe = fields.every(field => riskScores[field] < 0.95);

    return await model.create({
        messageHash,
        riskScores,
        isSafe,
    });
};

const PerspectiveResult =
    mongoose.models.PerspectiveResult ||
    mongoose.model('PerspectiveResult', PerspectiveResultSchema);

export default PerspectiveResult;
