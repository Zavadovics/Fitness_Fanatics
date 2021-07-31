import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import upload from '../middlewares/multer.js';
import cloudinary from '../cloudinary.js';
import Photo from '../models/Photo.js';
import verify from '../middlewares/tokenVerification.js';
import { loginController } from '../controllers/loginController.js';
import { userController } from '../controllers/userController.js';
import { cityController } from '../controllers/cityController.js';
import { activityController } from '../controllers/activityController.js';
// import { photoController } from '../controllers/photoController.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { helloController } from '../controllers/helloController.js';

const router = express.Router();
router.use(cors());
router.use(express.json());

router.get('/hello', helloController.get);

router.post('/login', loginController.post);
router.post('/user', userController.post);
router.put('/user/password', userController.putPassword);
router.get('/user/:id', verify, userController.get);
router.put('/user/:id', verify, userController.put);

router.get('/cities', cityController.get);

router.post('/activities', /* verify, */ activityController.post);
router.get('/activities/:id', /* verify, */ activityController.get);
router.put('/activities/:id', /* verify, */ activityController.put);
router.delete('/activities/:id', /* verify, */ activityController.delete);

// router.get('/photo/:id', photoController.get);
// router.put('/photo/:id', photoController.put);
// router.delete('/photo/:id', photoController.delete);

/* Upload or update image in Mongo & Cloudinary */
router.put('/photo/:id', verify, upload.single('image'), async (req, res) => {
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
              user_id: req.body.user_id,
              user_email: req.body.user_email,
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
        image: result.secure_url,
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
              user_id: req.body.user_id,
              user_email: req.body.user_email,
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
        image: result.secure_url,
      });
    }
  } catch (err) {
    console.error(err);
  }
});

/*  */
router.get('/photo/:id', verify, async (req, res) => {
  try {
    // Find photo by id
    const photo = await Photo.find({ user_id: req.params.id });
    res.status(200).json(photo);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/photo/:id', verify, async (req, res) => {
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

/* Upload or update image in Mongo & Cloudinary */
router.put('/plan/:id', verify, upload.single('image'), async (req, res) => {
  try {
    let plan = await Plan.find({ user_id: req.params.id });
    if (plan.length !== 0) {
      // Delete image from Cloudinary
      await cloudinary.v2.uploader.destroy(
        plan[0].cloudinary_id,
        (error, result) => console.log(result, error)
      );
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      // Update image in MongoDB
      plan = await Plan.updateOne(
        { user_id: req.params.id },
        [
          {
            $set: {
              user_id: req.body.user_id,
              user_email: req.body.user_email,
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
        image: result.secure_url,
      });
    } else {
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }

      // Save image in MongoDB
      plan = await Plan.updateOne(
        { user_id: req.params.id },
        [
          {
            $set: {
              user_id: req.body.user_id,
              user_email: req.body.user_email,
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
        image: result.secure_url,
      });
    }
  } catch (err) {
    console.error(err);
  }
});

/*  */
router.get('/plan/:id', verify, async (req, res) => {
  try {
    // Find plan by id
    const plan = await Plan.find({ user_id: req.params.id });
    res.status(200).json(plan);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/plan/:id', verify, async (req, res) => {
  try {
    // Find plan by id
    const plan = await Plan.find({ user_id: req.params.id });
    // Delete image from cloudinary
    await cloudinary.v2.uploader.destroy(
      plan[0].cloudinary_id,
      (error, result) => console.log(result, error)
    ); // Delete plan from db
    await Plan.deleteOne({ user_id: req.params.id });
    res.status(200).json({
      status: 200,
      message: 'delete successful',
    });
  } catch (err) {
    console.log(err);
  }
});
/* plan */

export default router;
