import DataUriParser from 'datauri/parser.js';
import path from 'path';

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).replace('.', '');
    return parser.format(extName, file.buffer);
};

export default getDataUri;


// A Data URI is a string that contains the entire content of a file (like an image or PDF) encoded as a base64 string, embedded directly in the URI.
// You mainly use datauri when you:

//     Don't want to save the uploaded file to disk

//     Need to send file content directly to a service like Cloudinary

//     Are using multer.memoryStorage() so files are in-memory as Buffers