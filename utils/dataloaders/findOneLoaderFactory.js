import mongoose from './../../models/mongoose';
import DataLoader from 'dataloader';

export default function findOneLoaderFactory(
    model,
    key = '_id',
    conditions = {},
    options = {}
) {
    const batchLoadFn = async keyValues => {
        const keyMap = {};

        const Model = mongoose.model(model);

        const uniqueKeys = [...new Set(keyValues)];

        /** @type Array */
        const results = await Model.find(
            {
                [key]: { $in: uniqueKeys },
                ...conditions,
            },
            { ...options }
        );

        for (let x = 0; x < results.length; x++) {
            const instance = results[x];
            keyMap[instance[key]] = instance;
        }

        const response = [];

        for (let x = 0; x < keyValues.length; x++) {
            const keyVal = keyValues[x];
            response.push(keyMap[keyVal] || null);
        }

        return response;
    };

    return new DataLoader(batchLoadFn, { cache: false });
}
