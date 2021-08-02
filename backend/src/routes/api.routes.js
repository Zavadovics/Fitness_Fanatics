import express from 'express';
import cors from 'cors';
import upload from '../middlewares/multer.js';
import verify from '../middlewares/tokenVerification.js';
import { loginController } from '../controllers/loginController.js';
import { userController } from '../controllers/userController.js';
import { cityController } from '../controllers/cityController.js';
import { activityController } from '../controllers/activityController.js';
import { photoController } from '../controllers/photoController.js';
import { planController } from '../controllers/planController.js';
// import swaggerJsDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';

const router = express.Router();
router.use(cors());
router.use(express.json());

router.post('/login', loginController.post);
router.post('/user', userController.post);
router.get('/user/:id', verify, userController.get);
router.put('/user/:id', verify, userController.put);
router.put('/user/password', userController.putPassword);

router.get('/cities', cityController.get);
/* to-do ---> post */

router.get('/activities/:id', verify, activityController.get);
router.put('/activities/:id', verify, activityController.put);
router.post('/activities', verify, activityController.post);
router.delete('/activities/:id', verify, activityController.delete);

router.get('/photo/:id', verify, photoController.get);
router.put('/photo/:id', verify, upload.single('image'), photoController.put);
router.delete('/photo/:id', verify, photoController.delete);

router.get('/plan', verify, planController.get);
router.post('/plan', verify, upload.single('image'), planController.post);

export default router;
