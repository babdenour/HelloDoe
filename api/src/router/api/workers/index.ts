import { Router } from 'express';

import * as UserRoles from '../../../enums/userRoles';
import * as authMiddleware from '../../middlewares/auth.middleware';
import * as workerGet from './workerGet';
import { getDoers } from './workersGet';

const router = Router();

router.get('/:encryptedParams', authMiddleware([UserRoles.ADMIN, UserRoles.WORKER]), workerGet);
router.get('/', authMiddleware([UserRoles.ADMIN]), getDoers);

export default router;
