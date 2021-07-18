import logger from '../logger.js';
// import logger from 'logger';
import Activity from '../models/Activity.js';
import { activityValidation } from '../validations/activityValidation.js';

export const activityService = {
  /* ⬇️ save new activity - OK */
  async saveActivity(activityData) {
    try {
      const { error } = activityValidation(activityData);
      if (error) {
        return {
          status: 400,
          message: error.details[0].message,
        };
      }
      const activity = new Activity(activityData);
      await activity.save();
      return {
        status: 200,
        message: 'Activity saved',
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

  async updateActivity(id, reqData) {
    const { /* _id, */ __v, updatedAt, ...others } = reqData;
    const { error } = activityValidation(others);
    console.log('reqData', reqData);

    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }

    try {
      await Activity.findByIdAndUpdate(id, reqData, {
        useFindAndModify: false,
      });
      return {
        status: 200,
        message: 'Activity updated!',
      };
    } catch (err) {
      console.error(err);
      logger.error(err);
      return {
        status: 500,
        message: 'Something went wrong',
      };
    }
  },

  // async deleteActivity(id, userData) {
  //   try {
  //     const { error } = activityValidation(userData);
  //     if (error) {
  //       return {
  //         status: 400,
  //         message: error.details[0].message,
  //       };
  //     }

  //     const idExists = await Activity.findOne({
  //       id: userData.id,
  //     });
  //     if (idExists)
  //       return {
  //         status: 400,
  //         message: 'Activity already exists!',
  //       };
  //     await Activity.remove({ duration: 22 });
  //     return {
  //       status: 200,
  //       message: 'Activity deleted',
  //     };
  //   } catch (err) {
  //     logger.error(err);
  //     return {
  //       status: 500,
  //       message: 'Something went wrong',
  //     };
  //   }
  // },
};
