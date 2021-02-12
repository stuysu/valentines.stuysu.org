import mongoose from './mongoose';

const Schema = mongoose.Schema;

// A safeguard against people spamming the perspective api endpoint
const ApiLimitSchema = new Schema({
    email: String,
    usedAt: Date,
    expiresAt: Date,
});

// If it hasn't been at least a minute since the last time the user tried to use
// the endpoint, return true. Else return false.
ApiLimitSchema.statics.userHasUsedInLastMinute = async email => {
    const now = new Date();
    const model = mongoose.model('ApiLimit');
    // As a safeguard to preserve anonymity, delete expired rows
    await model.deleteMany({
        expiresAt: {
            $lt: now,
        },
    });

    return await model.exists({ email });
};

ApiLimitSchema.statics.recordApiUse = async email => {
    const now = new Date();
    const thirtySeconds = 1000 * 30;
    const thirtySecondsFromNow = new Date(now.getTime() + thirtySeconds);

    return mongoose.model('ApiLimit').create({
        email,
        usedAt: now,
        expiresAt: thirtySecondsFromNow,
    });
};

const ApiLimit =
    mongoose.models.ApiLimit || mongoose.model('ApiLimit', ApiLimitSchema);

export default ApiLimit;
