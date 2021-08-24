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

router.post('/user', userController.post); /* test */
router.post('/login', loginController.post); /* test */
router.post('/password', userController.sendPasswordResetMail);
router.put('/password-reset/:id/:token', userController.resetPassword);
router.get('/user/:id', verify, userController.get); /* test */
router.put('/user/:id', verify, userController.put); /* test */

router.get('/cities', cityController.get); /* test */

router.get('/activities/:id', verify, activityController.get); /* test */
router.put('/activities/:id', verify, activityController.put); /* test */
router.post('/activities', verify, activityController.post); /* test */
router.delete('/activities/:id', verify, activityController.delete); /* test */

router.get('/photo/:id', verify, photoController.get); /* test */
router.put('/photo/:id', verify, upload.single('image'), photoController.put);
router.delete('/photo/:id', verify, photoController.delete); /* test */

router.get('/plan', verify, planController.get); /* test */
router.post('/plan', verify, upload.single('image'), planController.post);

export default router;
