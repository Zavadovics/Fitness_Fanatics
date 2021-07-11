import logger from 'logger';
import Activity from '../models/Activity.js';
import { activityValidation } from '../activityValidation.js';

export const activityService = {
  async saveActivity(activityData) {
    const { error } = activityValidation(activityData);
    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }
    // const activityStartDateAndTimeExist = await Activity.findOne({
    //   activityStartDateAndTime: activityData.activityStartDateAndTime,
    // });
    // if (activityStartDateAndTimeExist)
    //   return {
    //     status: 400,
    //     message: 'Activity already exists!',
    //   };

    // const activity = new Activity(activityData);
    const activity = new Activity({
      // activityStartDateAndTime: activityData.activityStartDateAndTime,
      duration: activityData.duration,
      activityType: activityData.activityType,
      distance: activityData.distance,
      comment: activityData.comment,
    });

    try {
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
  async updateEvent(id, userData) {
    const { error } = activityValidation(userData);
    if (error) {
      return {
        status: 400,
        message: error.details[0].message,
      };
    }

    const durationExists = await Activity.findOne({
      duration: userData.duration,
    });
    if (durationExists)
      return {
        status: 400,
        message: 'Activity already exists!',
      };

    try {
      await Activity.findByIdAndUpdate(id, userData, {
        useFindAndModify: false,
      });
      return {
        status: 200,
        message: 'Activity updated',
      };
    } catch (err) {
      logger.error(err);
      return {
        status: 500,
        message: 'Something went wrong',
      };
    }
  },
};
