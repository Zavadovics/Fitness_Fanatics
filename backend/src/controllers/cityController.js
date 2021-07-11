import City from '../models/City.js';
import { cityService } from '../services/cityService.js';

export const cityController = {
  async get(req, res) {
    try {
      await City.find()
        .sort({ name: 1 })
        .then(foundActivities => res.status(200).json(foundActivities));
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
