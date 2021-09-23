import express from 'express';
import { nanoid } from 'nanoid';
const router = express.Router();

const idLength = 24;

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
 *         userName:
 *           type: string
 *           description: Username of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         firstName:
 *           type: string
 *           description: First name of the user
 *         email:
 *           type: string
 *           description: Email address of the user
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
 *         userName: Tesztelod
 *         lastName: Teszt
 *         firstName: Elod
 *         email: tesztelod@gmail.com
 *         password: titkosjelszo
 *         gender: male
 *         cityOfResidence: Kukutyin
 *         weight: 130
 *         birthDate: 1963.02.11
 *         motivation: Never give up!
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API responsible for users
 */

/**
 * @swagger
 * /user:
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
 *                   description: Please open the e-mail we have just sent you to activate your account
 *                 user:
 *                   type: object
 *                   description: The details of the newly-created user
 *               required:
 *                 - status
 *                 - message
 *                 - user
 *             example:
 *               status: 200
 *               message: Please open the e-mail we have just sent you to activate your account
 *               user: details of the user
 *
 *       400:
 *         description: Validation of the user's details failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 400
 *                 message:
 *                   type: string
 *                   description: error.details[0].message
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 400
 *               message: error.details[0].message
 *
 *       409:
 *         description: This email address has already been registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 409
 *                 message:
 *                   type: string
 *                   description: This e-mail address has already been registered
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 409
 *               message: This e-mail address has already been registered
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
 *                   description: Database error
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 500
 *               message: Database error
 */

router.post('/', (req, res) => {
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
 *
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
 *                   description: Your information has been added to our database
 *                 updatedUser:
 *                   type: object
 *                   description: The updated details of the user
 *               required:
 *                 - status
 *                 - message
 *                 - updatedUser
 *             example:
 *               status: 200
 *               message: Your information has been added to our database
 *               updatedUser: details of the user
 *
 *       400:
 *         description: Validation of the user's details failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 400
 *                 message:
 *                   type: string
 *                   description: error.details[0].message
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 400
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
 *                   description: Database error
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 500
 *               message: Database error
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

/**
 * @swagger
 * /password:
 *   post:
 *     summary: Generates a token and sends a password-change email to the user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Password-change email has been sent
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
 *                   description: Please open the e-mail we have just sent you to change your password
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 200
 *               message: Please open the e-mail we have just sent you to change your password
 *
 *       400:
 *         description: This email address has not yet been registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 400
 *                 message:
 *                   type: string
 *                   description: This e-mail address has not yet been registered
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 400
 *               message: This e-mail address has not yet been registered
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
 *                   description: Activation failed
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 500
 *               message: Activation failed
 */

/**
 * @swagger
 * /password-reset/{id}/{token}:
 *   post:
 *     summary: Checks the validity of token and lets the user change the password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Password-change email has been sent
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
 *                   description: Password has been updated. You can log in now
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 200
 *               message: Password has been updated. You can log in now
 *
 *       401:
 *         description: Token not valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: 401
 *                 message:
 *                   type: string
 *                   description: The time to change your password (15 mins) has expired
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 401
 *               message: The time to change your password (15 mins) has expired
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
 *                   description: Password could not be changed
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 500
 *               message: Password could not be changed
 */

export default router;
