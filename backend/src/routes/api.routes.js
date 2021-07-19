import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { loginController } from '../controllers/loginController.js';
import { userController } from '../controllers/userController.js';
import { cityController } from '../controllers/cityController.js';
import { activityController } from '../controllers/activityController.js';
import { photoController } from '../controllers/photoController.js';
// import { getActivityByIdController } from '../controllers/getActivityByIdController.js';
import upload from '../middlewares/multer.js';
import cloudinary from '../middlewares/cloudinary.js';
import Photo from '../models/Photo.js';

const router = express.Router();
router.use(cors());
router.use(express.json());

router.post('/login', loginController.post);
// router.post('/register', registrationController.post);
router.post('/user', userController.post);
router.get('/user/:id', userController.get);
router.get('/user/:id', userController.getId);
router.put('/user/:id', userController.put);
// router.delete('/user/:id', userController.delete);

/* photo */
// router.post('/photo', upload.single('image'), photoController.post);
// router.get('/photo/:id', photoController.getId);
// router.put('/photo/:id', photoController.put);
// router.delete('/photo/:id', photoController.delete);
router.post('/photo', upload.single('image'), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new photo
    let photo = new Photo({
      user_id: req.body.user_id,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save photo
    await photo.save();
    res.json(photo);
  } catch (err) {
    console.log(err);
  }
});

router.put('/photo/:id', upload.single('image'), async (req, res) => {
  try {
    let photo = await Photo.find({ user_id: req.params.id });
    // Delete image from cloudinary
    // await cloudinary.uploader.destroy(photo.cloudinary_id);
    // Upload image to cloudinary
    let result;
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      user_id: req.body.user_id,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    };
    photo = await Photo.updateOne(
      { user_id: req.params.id },
      { $set: { data } },
      {
        upsert: true,
      }
    );
    res.json(photo);
  } catch (err) {
    console.log(err);
  }
});

router.get('/photo/:id', async (req, res) => {
  try {
    // Find photo by id
    let photo = await Photo.find({ user_id: req.params.id });
    // console.log('req.params.id', req.params.id);
    // let photo = await Photo.findById(req.params.id);
    res.json(photo);
  } catch (err) {
    console.log(err);
  }
});
/* photo */

router.get('/cities', cityController.get);

// router.get('/activities/:id', getActivityByIdController.get);
router.get('/activities/:id', activityController.get);
router.get('/activities/:id', activityController.getId);
router.post('/activities', activityController.post);
router.put('/activities/:id', activityController.put);
router.delete('/activities/:id', activityController.delete);

export default router;
