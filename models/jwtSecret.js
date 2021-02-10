import mongoose from './mongoose';
import { randomBytes } from 'crypto';

const Schema = mongoose.Schema;

const JWTSecretSchema = new Schema({
    secret: String,
    createdAt: Date,
    useUntil: Date,
    maxTokenExpiration: Date,
});

const thirtyDays = 1000 * 60 * 60 * 24 * 30;

JWTSecretSchema.statics.maxAge = thirtyDays;

JWTSecretSchema.statics.generateNewSecret = () => {
    const secret = randomBytes(32).toString('hex');
    const model = mongoose.model('JWTSecret');

    const now = new Date();

    const useUntil = new Date(now.getTime() + model.maxAge);
    const maxTokenExpiration = new Date(useUntil.getTime() + model.maxAge);

    return model.create({
        secret,
        useUntil,
        maxTokenExpiration,
        createdAt: now,
    });
};

JWTSecretSchema.statics.getCurrentSecret = () => {
    const model = mongoose.model('JWTSecret');
    const now = new Date();
    return model.findOne({ useUntil: { $gt: now } });
};

const JWTSecret =
    mongoose.models.JWTSecret || mongoose.model('JWTSecret', JWTSecretSchema);

export default JWTSecret;
