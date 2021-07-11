import express from 'express';
import cors from 'cors';

import { helloController } from '../controllers/helloController.js';
import { loginController } from '../controllers/loginController.js';
import { registrationController } from '../controllers/registrationController.js';
// import { getUsersController } from '../controllers/getUsersController.js';
import { activityController } from '../controllers/activityController.js';
import { cityController } from '../controllers/cityController.js';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/login', loginController.post);
router.get('/hello', helloController.get);
// router.get('/users', getUsersController.get);
router.post('/register', registrationController.post);

router.get('/cities', cityController.get);

router.get('/activities', activityController.get);
router.get('/activities/:id', activityController.get);
router.post('/activities', activityController.post);
router.put('/activities/:id', activityController.put);
// router.delete('/activities/:id', activityController.delete);

export default router;
