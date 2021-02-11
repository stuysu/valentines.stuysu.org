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
        expires: {
            $lt: now,
        },
    });

    return await model.exists({ email });
};

ApiLimitSchema.statics.recordApiUse = async email => {
    const now = new Date();
    const oneMinute = 1000 * 60;
    const oneMinuteFromNow = new Date(now.getTime() + oneMinute);

    return mongoose.model('ApiLimit').create({
        email,
        usedAt: now,
        expires: oneMinuteFromNow,
    });
};

const ApiLimit =
    mongoose.models.ApiLimit || mongoose.model('ApiLimit', ApiLimitSchema);

export default ApiLimit;
