import path from 'path';
import { randomBytes } from 'crypto';
import { createWriteStream } from 'fs';

export default function saveGraphQLFileLocally(file, filename) {
    return new Promise(async (resolve, reject) => {
        const { filename: originalFilename, createReadStream } = await file;

        if (!filename) {
            const randomName =
                randomBytes(4).toString('hex') + originalFilename;
            filename = path.resolve(process.cwd(), 'tmp', randomName);
        }

        createReadStream()
            .pipe(createWriteStream(filename, { recursive: true }))
            .on('error', er => reject(er))
            .on('finish', () => resolve(filename));
    });
}
