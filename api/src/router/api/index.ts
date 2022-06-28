import { Router } from 'express';

import { bodyParserMiddlewares } from './body-parser-middlewares';
import missions from './missions';
import users from './users';
import workers from './workers';

const router = Router();

router.use('/missions', ...bodyParserMiddlewares, missions);
router.use('/users', ...bodyParserMiddlewares, users);
router.use('/workers', ...bodyParserMiddlewares, workers);

export default router;
