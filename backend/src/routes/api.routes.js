import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { loginController } from '../controllers/loginController.js';
import { userController } from '../controllers/userController.js';
import { cityController } from '../controllers/cityController.js';
import { activityController } from '../controllers/activityController.js';
// import { getActivityByIdController } from '../controllers/getActivityByIdController.js';
import upload from '../middlewares/multer.js';
import cloudinary from '../cloudinary.js';
import Photo from '../models/Photo.js';

const router = express.Router();
router.use(cors());
router.use(express.json());

router.post('/login', loginController.post);
router.post('/user', userController.post);
router.get('/user/:id', userController.get);
router.put('/user/:id', userController.put);
// router.get('/user/:id', userController.getId);

router.get('/cities', cityController.get);

/* to fill fields of EditActivity */
// router.get('/activities/:id', getActivityByIdController.get);
router.post('/activities', activityController.post);

// router.get('/activities/:id', activityController.get);
// router.get('/activities', activityController.get);
router.get('/activities/:id', activityController.get);
// router.get('/activity/:id', activityController.getId);

router.put('/activities/:id', activityController.put);
router.delete('/activities/:id', activityController.delete);
/* Upload or update image in Mongo & Cloudinary */
router.put('/photo/:id', upload.single('image'), async (req, res) => {
  try {
    let photo = await Photo.find({ user_id: req.params.id });

    if (photo.length !== 0) {
      // Delete image from Cloudinary
      await cloudinary.v2.uploader.destroy(
        photo[0].cloudinary_id,
        (error, result) => console.log(result, error)
      );
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      // Update image in MongoDB
      photo = await Photo.updateOne(
        { user_id: req.params.id },
        [
          {
            $set: {
              user_id: req.params.id,
              avatar: result.secure_url,
              cloudinary_id: result.public_id,
            },
          },
        ],
        { upsert: true }
      );
      res.status(200).json({
        status: 200,
        message: 'upload successful',
      });
    } else {
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      // Save image in MongoDB
      photo = await Photo.updateOne(
        { user_id: req.params.id },
        [
          {
            $set: {
              user_id: req.params.id,
              avatar: result.secure_url,
              cloudinary_id: result.public_id,
            },
          },
        ],
        { upsert: true }
      );
    }
    res.status(200).json({
      status: 200,
      message: 'upload successful',
    });
  } catch (err) {
    console.error(err);
  }
});

/*  */
router.get('/photo/:id', async (req, res) => {
  try {
    // Find photo by id
    const photo = await Photo.find({ user_id: req.params.id });
    res.status(200).json(photo);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/photo/:id', async (req, res) => {
  try {
    // Find photo by id
    const photo = await Photo.find({ user_id: req.params.id });
    // Delete image from cloudinary
    await cloudinary.v2.uploader.destroy(
      photo[0].cloudinary_id,
      (error, result) => console.log(result, error)
    ); // Delete photo from db
    await Photo.deleteOne({ user_id: req.params.id });
    res.status(200).json({
      status: 200,
      message: 'delete successful',
    });
  } catch (err) {
    console.log(err);
  }
});
/* photo */

export default router;
