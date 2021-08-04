// import logger from '../logger.js';
import Activity from '../models/Activity.js';
import { activityValidation } from '../validations/activityValidation.js';

export const activityService = {
  /* ⬇️ save new activity - OK */
  async saveActivity(activityData) {
    try {
      const { error } = activityValidation(activityData);
      if (error) {
        console.error(error);
        return {
          status: 404,
          message: error.details[0].message,
        };
      }
      const newActivity = new Activity(activityData);

      await newActivity.save();
      return {
        status: 200,
        message: 'Activity saved',
        newActivity: newActivity,
      };
    } catch (err) {
      next(err);
      return {
        status: 500,
        message: 'Something went wrong',
      };
    }
  },
  /* ⬆️ save new activity - OK */

  /* ⬇️ update activity - OK */
  async updateActivity(id, reqData) {
    try {
      const updatedActivity = await Activity.findByIdAndUpdate(id, reqData, {
        useFindAndModify: false,
      });
      return {
        status: 200,
        message: 'Activity updated!',
        updatedActivity: updatedActivity,
      };
    } catch (err) {
      next(err);
      return {
        status: 500,
        message: 'Something went wrong',
      };
    }
  },
  /* ⬆️ update activity - OK */
};
