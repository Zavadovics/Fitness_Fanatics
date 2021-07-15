import express from 'express';
import cors from 'cors';

import { loginController } from '../controllers/loginController.js';
import { activityController } from '../controllers/activityController.js';
import { getActivityByIdController } from '../controllers/getActivityByIdController.js';
import { cityController } from '../controllers/cityController.js';
import { userController } from '../controllers/userController.js';
// import { getPhoto, createPhoto } from '../controllers/photoController.js';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/login', loginController.post);
// router.post('/register', registrationController.post);
router.post('/user', userController.post);
router.get('/user/:id', userController.get);
router.put('/user/:id', userController.put);
// router.delete('/user/:id', userController.delete);

router.get('/cities', cityController.get);

router.get('/activities', activityController.get);
router.get('/activities/:id', getActivityByIdController.get);
router.post('/activities', activityController.post);
router.put('/activities/:id', activityController.put);

router.get('/activities/:id', activityController.getId);

router.delete('/activities/:id', activityController.delete);

// router.get('/', getItems);
// router.post('/', createItem);
export default router;
