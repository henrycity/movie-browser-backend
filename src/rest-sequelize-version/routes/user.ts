import { Router } from 'express';
import { getMe } from '../controllers/user';

const router = Router();

router.get('/', getMe);

export default router;
