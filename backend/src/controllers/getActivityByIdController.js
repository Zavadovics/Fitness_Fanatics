import Activity from '../models/Activity.js';

export const getActivityByIdController = {
  get(req, res, next) {
    try {
      Activity.findById(req.params.id).then(foundActivity =>
        res.status(200).json(foundActivity)
      );
    } catch (err) {
      next(err);
    }
  },
};
