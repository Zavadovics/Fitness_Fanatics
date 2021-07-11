import Activity from '../models/Activity.js';
import { activityService } from '../services/activityService.js';

export const activityController = {
  async post(req, res) {
    const data = await activityService.saveActivity(req.body);
    res.status(data.status).json(data);
  },
  async get(req, res) {
    try {
      await Activity.find()
        .sort({ createdAt: -1 })
        .then(foundActivities => res.status(200).json(foundActivities));
    } catch (err) {
      res.status(400).send(err);
    }
  },
  // async get(req, res) {
  //   try {
  //     await Activity.find(_id).then(foundActivity =>
  //       res.status(200).json(foundActivity)
  //     );
  //   } catch (err) {
  //     res.status(400).send(err);
  //   }
  // },
  async put(req, res) {
    const { id } = req.params;
    const reqData = req.body;

    const data = await activityService.updateEvent(id, reqData);
    res.status(data.status).json(data);
  },
};
