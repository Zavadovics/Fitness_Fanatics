import express from 'express';
const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *   schemas:
 *     Photo:
 *       type: object
 *       required:
 *         - user_id
 *         - avatar
 *         - cloudinary_id
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the training plan
 *         user_id:
 *           type: string
 *           description: ID of the user who uploaded the training plan
 *         avatar:
 *           type: string
 *           description: The Cloudinary URL of the training plan
 *         cloudinary_id:
 *           type: string
 *           description: The Cloudinary ID of the training plan
 *
 *       example:
 *         _id: 60c77f12835fce44a438d876
 *         user_id: 60fc016e026bee97315ba543
 *         avatar: https://res.cloudinary.com/dywtied0r/image/upload/v1627889086/tii7t48rtw1qeytnpah3.jpeg
 *         cloudinary_id: tii7t48rtw1qeytnp135
 */

/**
 * @swagger
 * tags:
 *   name: Photos
 *   description: API dealing with photos
 */

/**
 * @swagger
 * /photo/{id}:
 *   get:
 *     summary: Returns the user's profile photo
 *     tags: [Photos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user's profile photo if they have one uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Photo'
 *       400:
 *         description: Something went wrong
 *     security:
 *     - bearerAuth: []
 */

router.get('/:id', (req, res) => {
  const photo = req.app.db.get('photo');

  res.send(photo);
});

export default router;
