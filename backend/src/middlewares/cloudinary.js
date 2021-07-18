import cloudinary from 'cloudinary';
// import dotenv from 'dotenv';
// dotenv.config();

cloudinary.config({
  cloud_name: 'dywtied0r',
  api_key: '282492283825573',
  api_secret: 'aGo9UjDf9O3YizdoM49VHcJssQ0',
});

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

export default cloudinary;
