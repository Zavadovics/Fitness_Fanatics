import Activity from '../models/Activity.js';
import { activityService } from '../services/activityService.js';

export const activityController = {
  /* ⬇️ get all activities by the user's Id - OK */
  async get(req, res, next) {
    try {
      await Activity.find({ user_id: req.params.id })
        .sort({ createdAt: -1 })
        .then(foundActivities => res.status(200).json(foundActivities));
    } catch (err) {
      next(err);
    }
  },
  /* ⬆️ get all activities by the user' Id - OK */

  /* ⬇️ save new activity - OK */
  async post(req, res, next) {
    try {
      const data = await activityService.saveActivity(req.body);
      res.status(data.status).json(data);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },
  /* ⬆️ save new activity - OK */

  /* ⬇️ find an activity in db by Id - OK */
  async getId(req, res) {
    try {
      const activity = await Activity.findById(req.params.id);
      res.status(200).json(activity);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  /* ⬆️ find an activity in db by Id - OK */

  async put(req, res, next) {
    //   console.log(req.body);
    //   try {
    //     const activity = await Activity.findById(req.params.id);
    //     console.log('cont', activity);

    //     const data = await activityService.updateActivity(req.body);
    //     console.log('controller', data);
    //     res.status(data.status).json(data);
    //   } catch (err) {
    //     console.error(err);
    //     next(err);
    //   }
    // try {
    // const activity = await Activity.findById(req.params.id);
    // if (activity.username === req.body.username)
    try {
      const updatedActivity = await Activity.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { desc: req.body.desc }
      );
      res.status(200).json({
        status: 200,
        message: 'ALL GOOD',
      });
    } catch (err) {
      next(err);
    }
    /* catch (err) {
        console.error(err);
        res.status(500).json(err);
      } */
    // else {
    //   res.status(401).json('You can update only your activity!');
    // }
    // } catch (err) {
    //   next(err);
  },

  async delete(req, res) {
    const deleteId = req.params.id;

    try {
      const activityData = await Activity.findByIdAndDelete(deleteId);
      if (!activityData) return res.sendStatus(404);
      return res.status(200).send({ message: 'Activity was deleted' });
    } catch (err) {
      return res.status(400).send(err);
    }
  },
};
