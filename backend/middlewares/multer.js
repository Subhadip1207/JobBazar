import multer from "multer";

const storage = multer.memoryStorage(); // Store files in memory RAM (buffer)
export const singleUpload = multer({ storage }).single("file"); // Use 'file' as the field name for single file uploads