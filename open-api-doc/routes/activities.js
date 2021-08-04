import express from 'express';
import { nanoid } from 'nanoid';
const router = express.Router();

const idLength = 24;

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       required:
 *         - activityDate
 *         - activityTime
 *         - duration
 *         - activityType
 *         - distance
 *         - comment
 *       properties:
 *         user_id:
 *           type: string
 *           description: The auto-generated id of the completed activity
 *         activityDate:
 *           type: date
 *           description: The start date of the activity
 *         activityTime:
 *           type: string
 *           description: The start time of activity
 *         duration:
 *           type: number
 *           description: The duration of the activity
 *         activityType:
 *           type: string
 *           description: The type of the activity
 *         distance:
 *           type: number
 *           description: The distance of the activity
 *         comment:
 *           type: string
 *           description: A comment left for the activity
 *       example:
 *         user_id: 60f55b2e406f3d3ec1e2a0fa
 *         activityDate: 2021-06-30T00:00:00.000+00:00
 *         activityTime: 13:00
 *         duration: 65
 *         activityType: úszás
 *         distance: 8300
 *         comment: éjszakai macska kergetés
 */

/**
 * @swagger
 * tags:
 *   name: Activities
 *   description: API that manages activities
 */

/**
 * @swagger
 * /activities/{id}:
 *   get:
 *     summary: Gets all activities of the logged in user
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The list of all activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Something went wrong
 *     security:
 *     - bearerAuth: []
 */

router.get('/:id', (req, res) => {
  const activities = req.app.db.get('activities');

  res.send(activities);
});

/**
 * @swagger
 * /activities/{id}:
 *   put:
 *     summary: Updates the activity by id
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The activity id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       200:
 *         description: The activity has been updated
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
 *                   description: Activity updated!
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 200
 *               message: Activity updated!

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
      .get('activities')
      .find({ _id: req.params.id })
      .assign(req.body)
      .write();

    res.send(req.app.db.get('activities').find({ _id: req.params.id }));
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /activities:
 *   post:
 *     summary: Adds a new activity
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *     responses:
 *       200:
 *         description: New activity has been saved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *
 *       404:
 *         description: The activity details are invalid
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

router.post('/', (req, res) => {
  try {
    const activity = {
      _id: nanoid(idLength),
      ...req.body,
    };

    req.app.db.get('activities').push(activity).write();

    res.send(activity);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /activities/{id}:
 *   delete:
 *     summary: Deletes the activity by id
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The activity id
 *
 *     responses:
 *       200:
 *         description: The activity has been deleted
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
 *                   description: The activity has been deleted
 *               required:
 *                 - status
 *                 - message
 *             example:
 *               status: 200
 *               message: The activity has been deleted
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

router.delete('/:id', (req, res) => {
  req.app.db.get('activities').remove({ _id: req.params.id }).write();

  res.sendStatus(200);
});

export default router;
