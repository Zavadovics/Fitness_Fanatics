// import Photo from '../models/Photo.js';
// // import { photoService } from '../services/photoService.js';

// export const photoController = {
//   /* ⬇️ get photo - OK */
//   async get(req, res, next) {
//     try {
//       await Photo.find({ user_id: req.params.id }).then(foundPhoto =>
//         res.status(200).json(foundPhoto)
//       );
//     } catch (err) {
//       next(err);
//     }
//   },
//   /* ⬆️ get photo - OK */

//   /* ⬇️ save new photo or update existing - OK */
//   async put(req, res, next) {
//     try {
//       const { id } = req.params;
//       const reqData = req.body;

//       let photo = await Photo.find({ user_id: req.params.id });

//       const data = await userService.updateUser(id, reqData);
//       res.status(data.status).json(data);
//     } catch (err) {
//       console.error(err);
//       next(err);
//     }
//   },
//   /* ⬆️ save new photo or update existing - OK */

//   /* ⬇️ find photo in db by Id - OK */
//   //   async getId(req, res) {
//   //     try {
//   //       const photo = await Photo.findById(req.params.id);
//   //       res.status(200).json(photo);
//   //     } catch (err) {
//   //       res.status(500).json(err);
//   //     }
//   //   },
//   /* ⬆️ find photo in db by Id - OK */
// };
