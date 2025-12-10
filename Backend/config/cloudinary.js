const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// 1. LOGIN: We give Cloudinary our keys from the .env file
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. STORAGE SETTINGS: We tell it where to save the files
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'netflix-avatars', // The folder name you'll see in your Cloudinary Dashboard
    allowed_formats: ['jpg', 'png', 'jpeg'], // Only allow images (no PDF or Word docs)
  },
});

// 3. EXPORT: We bundle these tools so we can use them in other files
module.exports = { cloudinary, storage };