import express from 'express';
import { getSystemStatus } from '../controllers/heartbeat.js';

const router = express.Router();

router.get('/heartbeat', getSystemStatus);

export default router;
