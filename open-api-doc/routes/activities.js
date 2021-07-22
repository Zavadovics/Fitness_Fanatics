const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');

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
 *   description: The activity managing API
 */

/**
 * @swagger
 * /activities/:id:
 *   get:
 *     summary: Returns the list of all the activities of the logged in user
 *     tags: [Activities]
 *     responses:
 *       200:
 *         description: The list of the activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Something went wrong
 */

router.get('/:id', (req, res) => {
  const activities = req.app.db.get('activities');

  res.send(activities);
});

module.exports = router;
