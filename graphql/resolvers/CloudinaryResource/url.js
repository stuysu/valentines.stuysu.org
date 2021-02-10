import { v2 as cloudinary } from 'cloudinary';

export default (resource, { preset }) => {
    if (preset === 'previewLarge') {
        return cloudinary.url(resource._id, {
            secure: true,
            sign_url: true,
            height: 800,
            quality: 80,
        });
    }

    if (preset === 'thumbnailMedium') {
        return cloudinary.url(resource._id, {
            secure: true,
            height: 540,
        });
    }

    if (preset === 'thumbnailSmall') {
        return cloudinary.url(resource._id, {
            secure: true,
            height: 260,
            quality: 90,
        });
    }
};
