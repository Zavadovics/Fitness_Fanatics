// import logger from '../logger.js';
import Plan from '../models/Plan.js';
import cloudinary from '../cloudinary.js';

export const planService = {
  async savePlan(reqFile, reqBody) {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(reqFile.path);
      // Create new plan
      let plan = new Plan({
        user_id: reqBody.user_id,
        email: reqBody.email,
        title: reqBody.title,
        originalName: reqFile.originalname,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
      });
      // Save plan
      await plan.save();
      return {
        status: 200,
        message: 'training plan upload successful',
        plan: plan,
      };
    } catch (err) {
      next(err);
    }
  },
};
