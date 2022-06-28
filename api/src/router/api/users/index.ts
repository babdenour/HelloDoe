import { Router } from 'express';

import * as UserRoles from '../../../enums/userRoles';
import * as authMiddleware from '../../middlewares/auth.middleware';
import * as checkTokenValidity from './checkTokenValidity';
import * as create from './create';
import * as login from './login';

const router = Router();

router.post('/check-token', checkTokenValidity);
router.post('/create', authMiddleware([UserRoles.ADMIN]), create);
router.post('/login', login);

export default router;
