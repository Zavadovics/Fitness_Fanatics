import logger from '../logger.js';
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
          status: 400,
          message: error.details[0].message,
        };
      }
      const newActivity = new Activity(activityData);

      await newActivity.save();
      return {
        status: 200,
        message: 'Activity saved',
        newActivity: newActivity
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: 'Something went wrong',
      };
    }
  },
  /* ⬆️ save new activity - OK */

  // async updateActivity(activityData) {
  //   console.log('service', activityData);
  //   try {
  //     await Activity.save(activityData);
  //     res.status(200).json({
  //       status: 200,
  //       message: 'Activity updated',
  //     });
  //   } catch (err) {
  //     logger.error(err);
  //     return {
  //       status: 500,
  //       message: 'Something went wrong',
  //     };
  //   }
  // },

  // async updateActivity(id, reqData) {
  //   const { /* _id, */ __v, updatedAt, ...others } = reqData;
  //   const { error } = activityValidation(others);
  //   console.log('reqData', reqData);

  //   if (error) {
  //     return {
  //       status: 400,
  //       message: error.details[0].message,
  //     };
  //   }

  //   try {
  //     await Activity.findByIdAndUpdate(id, reqData, {
  //       useFindAndModify: false,
  //     });
  //     return {
  //       status: 200,
  //       message: 'Activity updated!',
  //     };
  //   } catch (err) {
  //     console.error(err);
  //     logger.error(err);
  //     return {
  //       status: 500,
  //       message: 'Something went wrong',
  //     };
  //   }
  // },
};
