import Plan from '../models/Plan.js';
import { planService } from '../services/planService.js';

export const planController = {
  async get(req, res, next) {
    try {
      await Plan.find()
        .sort({ createdAt: -1 })
        .then(foundPlans => res.status(200).json(foundPlans));
    } catch (err) {
      next(err);
    }
  },

  async post(req, res, next) {
    try {
      const reqFile = req.file;
      const reqBody = req.body;

      const data = await planService.savePlan(reqFile, reqBody);

      res.status(data.status).json(data);
    } catch (err) {
      next(err);
    }
  },
};
