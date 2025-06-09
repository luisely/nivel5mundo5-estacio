import express from 'express';
import { createContract, getContracts } from '../controllers/contractController.js';
import { requireAdmin } from '../middleware/admin.js';
import { validateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', validateToken, requireAdmin, createContract);
router.get('/:empresa/:inicio', validateToken, getContracts);

export default router;
