import Activity from '../models/Activity.js';
import { activityService } from '../services/activityService.js';

export const activityController = {
  /* ⬇️ get all activities - OK */
  async get(req, res, next) {
    try {
      await Activity.find()
        .sort({ createdAt: -1 })
        .then(foundActivities => res.status(200).json(foundActivities));
    } catch (err) {
      next(err);
    }
  },
  /* ⬆️ get all activities - OK */

  /* ⬇️ save new activity - OK */
  async post(req, res, next) {
    try {
      const data = await activityService.saveActivity(req.body);
      res.status(data.status).json(data);
    } catch (err) {
      next(err);
    }
  },
  /* ⬆️ save new activity - OK */

  /* ⬇️ find activity in db by Id - OK */
  async getId(req, res) {
    try {
      const activity = await Activity.findById(req.params.id);
      res.status(200).json(activity);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  /* ⬆️ find activity in db by Id - OK */

  // async get(req, res, next) {
  //   try {
  //     Activity.findById(req.params.id).then(foundActivity =>
  //       res.status(200).json(foundActivity)
  //     );
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  async put(req, res) {
    const { id } = req.params;
    const reqData = req.body;

    const data = await activityService.updateActivity(id, reqData);
    res.status(data.status).json(data);
  },

  /* ------------ */
  // async put(req, res, next) {
  //   try {
  //     const activity = await Activity.findById(req.params.id);
  //     if (activity.id === req.body.id)
  //       try {
  //         const updatedActivity = await Activity.findByIdAndUpdate(
  //           req.params.id,
  //           {
  //             $set: req.body,
  //           },
  //           { desc: req.body.desc }
  //         );
  //         res.status(200).json(updatedActivity);
  //       } catch (err) {
  //         res.status(500).json(err);
  //       }
  //     else {
  //       res.status(401).json('Activity update unsuccessful!');
  //     }
  //   } catch (err) {
  //     next(err);
  //   }
  // },
  /* ------------- */

  // async put(req, res) {
  //   const { id } = req.params;
  //   const reqData = req.body;

  //   const data = await activityService.updateActivity(id, reqData);
  //   res.status(data.status).json(data);
  // },

  async delete(req, res, next) {
    try {
      const activity = await Activity.findById(req.params.id);
      if (activity.id === req.body.id) {
        try {
          await activity.delete();
          res.status(200).json('Activity has been deleted');
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json('Activity deletion unsuccessful!');
      }
    } catch (err) {
      next(err);
    }
  },
};
