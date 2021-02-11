import { createHash } from 'crypto';

// hashes the input parameter using sha256 and returns the hex digest
export default function sha256(input) {
    return createHash('sha256').update(input).digest('hex');
}
