import express from 'express';
import { sendMaskHandler } from '../controllers/maskController.js';

const router = express.Router();

router.post('/', sendMaskHandler);

export default router;
