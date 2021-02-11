import { v2 as cloudinary } from 'cloudinary';

export default (resource) => {
    return cloudinary.url(resource._id, {
        secure: true,
        sign_url: true,
        height: 1000,
        quality: 95,
    });
};
