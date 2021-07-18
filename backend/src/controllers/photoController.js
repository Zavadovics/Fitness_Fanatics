import Photo from '../models/Photo.js';
import { photoService } from '../services/photoService.js';

export const photoController = {
  /* ⬇️ get all photos - OK */
  async get(req, res, next) {
    try {
      await Photo.find()
        .sort({ createdAt: -1 })
        .then(foundPhotos => res.status(200).json(foundPhotos));
    } catch (err) {
      next(err);
    }
  },
  /* ⬆️ get all photos - OK */

  /* ⬇️ save new photo - OK */
  //   async post(req, res, next) {
  //     try {
  //       const data = await photoService.savePhoto(req.body);
  //       res.status(data.status).json(data);
  //     } catch (err) {
  //       next(err);
  //     }
  //   },
  /* ⬆️ save new photo - OK */

  /* ⬇️ find photo in db by Id - OK */
  //   async getId(req, res) {
  //     try {
  //       const photo = await Photo.findById(req.params.id);
  //       res.status(200).json(photo);
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   },
  /* ⬆️ find photo in db by Id - OK */
};
