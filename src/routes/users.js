import express from 'express';
import db from '../../utils/db.js';
import { getUserProfile } from '../controllers/userController.js';
import { requireAdmin } from '../middleware/admin.js';
import { validateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', validateToken, getUserProfile)
router.get('/', validateToken, requireAdmin, (req, res) => {
  const listOfUsers = db.users.map(user => ({
    id: user.id,
    username: user.username,
    role: user.role
  }));
  res.json({ users: listOfUsers });
});

export default router;
