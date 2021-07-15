// import Photo from '../models/Photo.js';
// import { photoService } from '../services/photoService.js';

// export const photoController = {
//   async get(req, res, next) {
//     try {
//       Photo.findById(req.params.id).then(foundPhoto =>
//         res.status(200).json(foundPhoto)
//       );
//     } catch (err) {
//       next(err);
//     }
//   },
// };

// import Photo from '../models/Photo.js';

// export const getPhoto = async (req, res) => {
//   console.log('get photo');
//   try {
//     const photo = await Photo.find();
//     res.status(200).json(item);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const createPhoto = async (req, res) => {
//   const photo = new Photo(req.body);
//   try {
//     await photo.save();
//     res.status(201).json(photo);
//   } catch (error) {}
// };
