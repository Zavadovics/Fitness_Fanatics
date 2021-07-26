// import logger from '../logger.js';
// import Photo from '../models/Photo.js';
// // import { activityValidation } from '../validations/activityValidation.js';

// export const activityService = {
//   /* ⬇️ save new activity - OK */
//   async savePhoto(photoData) {
//     try {
//       const photo = new Photo(photoData);

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
//   /* ⬆️ save new activity - OK */

//   //   async updateActivity(id, reqData) {
//   //     const { /* _id, */ __v, updatedAt, ...others } = reqData;
//   //     const { error } = activityValidation(others);
//   //     console.log('reqData', reqData);

//   //     if (error) {
//   //       return {
//   //         status: 400,
//   //         message: error.details[0].message,
//   //       };
//   //     }

//   //     try {
//   //       await Activity.findByIdAndUpdate(id, reqData, {
//   //         useFindAndModify: false,
//   //       });
//   //       return {
//   //         status: 200,
//   //         message: 'Activity updated!',
//   //       };
//   //     } catch (err) {
//   //       console.error(err);
//   //       logger.error(err);
//   //       return {
//   //         status: 500,
//   //         message: 'Something went wrong',
//   //       };
//   //     }
//   //   },
// };
