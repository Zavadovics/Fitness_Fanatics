import logger from '../logger.js';
import Photo from '../models/Photo.js';
import cloudinary from '../cloudinary.js';

export const photoService = {
  async saveOrUpdatePhoto(id, reqFile, reqBody) {
    try {
      let photo = await Photo.find({ user_id: id });
      if (photo.length !== 0) {
        // Delete image from Cloudinary
        await cloudinary.v2.uploader.destroy(photo[0].cloudinary_id);
        // Upload image to cloudinary
        let result;
        if (reqFile) {
          result = await cloudinary.uploader.upload(reqFile.path);
        }
        // Update image in MongoDB
        photo = await Photo.updateOne(
          { user_id: id },
          [
            {
              $set: {
                user_id: reqBody.user_id,
                user_email: reqBody.user_email,
                avatar: result.secure_url,
                cloudinary_id: result.public_id,
              },
            },
          ],
          { upsert: true }
        );
        return {
          status: 200,
          message: 'upload successful',
          image: result.secure_url,
        };
      } else {
        // Upload image to cloudinary
        let result;
        if (reqFile) {
          result = await cloudinary.uploader.upload(reqFile.path);
        }
        // Save image in MongoDB
        photo = await Photo.updateOne(
          { user_id: id },
          [
            {
              $set: {
                user_id: reqBody.user_id,
                user_email: reqBody.user_email,
                avatar: result.secure_url,
                cloudinary_id: result.public_id,
              },
            },
          ],
          { upsert: true }
        );
        return {
          status: 200,
          message: 'upload successful',
          image: result.secure_url,
        };
      }
    } catch (err) {
      next(err);
    }
  },

  /* ⬇️ delete photo - TEST */
  async deletePhoto(id) {
    try {
      // Find photo by id
      const photo = await Photo.find({ user_id: id });
      // Delete image from cloudinary
      await cloudinary.v2.uploader.destroy(photo[0].cloudinary_id); // Delete photo from db
      await Photo.deleteOne({ user_id: id });
      return {
        status: 200,
        message: 'deletion successful',
      };
    } catch (err) {
      next(err);
    }
  },
  /* ⬆️ delete photo - TEST */
};
