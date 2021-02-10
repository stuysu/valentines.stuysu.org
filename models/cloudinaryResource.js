import mongoose from './mongoose';
import DataLoader from 'dataloader';
import cloudinaryResourceLoader from '../utils/dataloaders/cloudinaryResourceLoader';

const CloudinaryResourceSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    assetId: String,
    width: Number,
    height: Number,
    format: String,
    resourceType: String,
    createdAt: Date,
    tags: [String],
});

CloudinaryResourceSchema.statics.idLoader = new DataLoader(async publicIds => {
    const ids = [...new Set(publicIds)];

    const idMap = {};

    const model = mongoose.model('CloudinaryResource');

    /** @type Array */
    const storedResources = await model.find({
        _id: { $in: ids },
    });

    storedResources.forEach(resource => {
        idMap[resource._id] = resource;
    });

    const missingIds = ids.filter(id => !Boolean(idMap[id]));

    const dynamicallyLoadedDetails = await Promise.all(
        missingIds.map(id => cloudinaryResourceLoader.load(id))
    );

    const newDetails = dynamicallyLoadedDetails
        .filter(Boolean)
        .map(details => ({
            _id: details.public_id,
            assetId: details.asset_id,
            width: details.width,
            height: details.height,
            format: details.format,
            resourceType: details.resource_type,
            createdAt: details.created_at,
            tags: [String],
        }));

    /** @type Array */
    const newRows = await model.insertMany(newDetails);

    newRows.forEach(resource => {
        idMap[resource._id] = resource;
    });

    return publicIds.map(id => idMap[id] || null);
});

const CloudinaryResource =
    mongoose.models.CloudinaryResource ||
    mongoose.model('CloudinaryResource', CloudinaryResourceSchema);

export default CloudinaryResource;
