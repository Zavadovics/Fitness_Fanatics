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

const router = express.Router();
router.use(cors());
router.use(express.json());

router.post('/user', userController.post); /* swagger */
router.post('/login', loginController.post); /* swagger */
router.post('/password', userController.sendPasswordResetMail);
router.put('/password-reset/:id/:token', userController.resetPassword);
router.get('/user/:id', verify, userController.get); /* swagger */
router.put('/user/:id', verify, userController.put); /* swagger */

router.get('/cities', cityController.get); /* swagger */
/* to-do ---> post */

router.get('/activities/:id', verify, activityController.get); /* swagger */
router.put('/activities/:id', verify, activityController.put); /* swagger */
router.post('/activities', verify, activityController.post); /* swagger */
router.delete('/activities/:id', verify, activityController.delete);
/* swagger */

router.get('/photo/:id', verify, photoController.get); /* swagger */
router.put('/photo/:id', verify, upload.single('image'), photoController.put);
router.delete('/photo/:id', verify, photoController.delete);

router.get('/plan', verify, planController.get); /* swagger */
router.post('/plan', verify, upload.single('image'), planController.post);
/* swagger */

export default router;
