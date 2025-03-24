import express from 'express';
import { getJobs, putUser } from './controller.js'

const router = express.Router();  // Router to handle API requests

router.post('/', getJobs);
router.post('/users', putUser);

export default router;  // Use 'export default' instead of 'module.exports'
