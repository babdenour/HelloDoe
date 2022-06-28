import { Router } from 'express';

import * as UserRoles from '../../../enums/userRoles';
import * as authMiddleware from '../../middlewares/auth.middleware';
import * as missionGet from './missionGet';
import { getCandidates } from './missionGetCandidates';

const router = Router();

router.get('/:id/candidates', authMiddleware([UserRoles.ADMIN]), getCandidates);
router.get('/:encryptedParams', authMiddleware([UserRoles.ADMIN, UserRoles.WORKER]), missionGet);

export default router;
