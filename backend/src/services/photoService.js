import logger from '../logger.js';
// import logger from 'logger';
import Photo from '../models/Photo.js';
import { photoValidation } from '../validations/photoValidation.js';

export const photoService = {
  /* ⬇️ save new photo - OK */
  //   async savePhoto(photoData) {
  //     try {
  //       const { error } = photoValidation(photoData);
  //       if (error) {
  //         return {
  //           status: 400,
  //           message: error.details[0].message,
  //         };
  //       }
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
  /* ⬆️ save new photo - OK */
  //   async updatePhoto(id, reqData) {
  //     const { /* _id, */ __v, updatedAt, ...others } = reqData;
  //     const { error } = photoValidation(others);
  //     console.log('reqData', reqData);
  //     if (error) {
  //       return {
  //         status: 400,
  //         message: error.details[0].message,
  //       };
  //     }
  //     try {
  //       await Photo.findByIdAndUpdate(id, reqData, {
  //         useFindAndModify: false,
  //       });
  //       return {
  //         status: 200,
  //         message: 'Photo updated!',
  //       };
  //     } catch (err) {
  //       console.error(err);
  //       logger.error(err);
  //       return {
  //         status: 500,
  //         message: 'Something went wrong',
  //       };
  //     }
  //   },
};
