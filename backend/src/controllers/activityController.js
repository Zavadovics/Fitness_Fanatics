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
      next(err);
    }
  },
  /* ⬆️ save new activity - OK */

  /* ⬇️ find an activity by Id - OK */
  async getId(req, res, next) {
    try {
      const data = await Activity.findById(req.params.id);
      res.status(data.status).json(data);
    } catch (err) {
      next(err);
    }
  },
  /* ⬆️ find an activity by Id - OK */

  /* ⬇️ update activity - OK */
  async put(req, res, next) {
    try {
      const { id } = req.params;
      const reqData = req.body;

      const data = await activityService.updateActivity(id, reqData);
      res.status(data.status).json(data);
    } catch (err) {
      next(err);
    }
  },
  /* ⬆️ update activity - OK */

  /* ⬇️ delete activity - OK */
  async delete(req, res, next) {
    const deleteId = req.params.id;

    try {
      await Activity.findByIdAndDelete(deleteId);
      res.status(200).json({ message: 'Activity has been deleted' });
    } catch (err) {
      next(err);
    }
  },
  /* ⬆️ delete activity - OK */
};
