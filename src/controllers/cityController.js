import City from '../models/City.js';

export const cityController = {
  async get(req, res, next) {
    try {
      await City.find()
        .sort({ name: 1 })
        .then(foundActivities => res.status(200).json(foundActivities));
    } catch (err) {
      next(err);
    }
  },
};
