const cloudinary = require('cloudinary').v2;

const uploadPicStream = (picture, publicId) =>
    new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { public_id: publicId },
            function (err, image) {
                if (err) {
                    console.log(err);
                }
                err ? reject(err) : resolve(image);
            }
        );

        picture.createReadStream().pipe(uploadStream);
    });

export default uploadPicStream;
