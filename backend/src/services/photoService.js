// import logger from 'logger';
// import Photo from '../models/Photo.js';
// import { photoValidation } from '../validations/photoValidation.js';

// export const photoService = {
//   async savePhoto(photoData) {
//     const { error } = photoValidation(photoData);
//     if (error) {
//       return {
//         status: 400,
//         message: error.details[0].message,
//       };
//     }
//     const photoId = await Photo.findOne({
//       _id: photoData.id,
//     });
//     if (photoId)
//       return {
//         status: 400,
//         message: 'Same photo already exists in database!',
//       };

//     const photo = new Photo({
//       _id: photoData.id,
//     });

//     try {
//       await photo.save();
//       return {
//         status: 200,
//         message: 'Photo saved',
//       };
//     } catch (err) {
//       logger.error(err);
//       return {
//         status: 500,
//         message: 'Something went wrong',
//       };
//     }
//   },
// };
