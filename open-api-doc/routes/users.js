import express from 'express';
import { nanoid } from 'nanoid';
const router = express.Router();

const idLength = 24;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: Username of the user
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         email:
 *           type: string
 *           description: Email address of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         gender:
 *           type: string
 *           description: Gender of the user
 *         cityOfResidence:
 *           type: string
 *           description: The city of residence of user
 *         weight:
 *           type: number
 *           description: The weight of the user
 *         birthDate:
 *           type: string
 *           description: The birth date of the user
 *         motivation:
 *           type: string
 *           description: The motivational quote of the user
 *
 *       example:
 *         _id: 60c77f12835fce44a438d19b
 *         username: Tesztelod
 *         firstName: Elod
 *         lastName: Teszt
 *         email: tesztelod@gmail.com
 *         password: titkosjelszo
 *         gender: ferfi
 *         cityOfResidence: Kukutyin
 *         weight: 130
 *         birthDate: 1963.02.11
 *         motivation: Hajra Magyarok!
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API responsible for users
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registers a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User has successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 200
 *                 message:
 *                   type: string
 *                   description: User has successfully registered
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 200
 *               message: User has successfully registered
 *
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 500
 *                 message:
 *                   type: string
 *                   description: Something went wrong
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 500
 *               message: Something went wrong
 */

router.post('/user', (req, res) => {
  try {
    const user = {
      _id: nanoid(idLength),
      ...req.body,
    };

    req.app.db.get('users').push(user).write();

    res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Gets a user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The details of user
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *     security:
 *     - bearerAuth: []
 */

router.get('/:id', (req, res) => {
  const user = req.app.db.get('users').find({ _id: req.params.id }).value();

  if (!user) {
    res.sendStatus(404);
  }

  res.send(user);
});

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Updates the user's details
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User data has been updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 200
 *                 message:
 *                   type: string
 *                   description: User data has been updated
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 200
 *               message: User data has been updated
 *
 *       404:
 *         description: The user details are invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 404
 *                 message:
 *                   type: string
 *                   description: error.details[0].message
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 404
 *               message: error.details[0].message
 *
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 500
 *                 message:
 *                   type: string
 *                   description: Something went wrong
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 500
 *               message: Something went wrong
 *     security:
 *     - bearerAuth: []
 */

router.put('/:id', (req, res) => {
  try {
    req.app.db
      .get('users')
      .find({ _id: req.params.id })
      .assign(req.body)
      .write();

    res.send(req.app.db.get('users').find({ _id: req.params.id }));
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
