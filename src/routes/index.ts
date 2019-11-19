import { Router } from 'express';

import authRouter from './auth';
import profileRouter from './profile';

import { isAuthenticated } from '../config/passport';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', {
    name: 'index',
    title: 'Auth0 Webapp sample Nodejs',
  });
});

router.use('/', authRouter);
router.use('/', isAuthenticated, profileRouter);

export default router;
