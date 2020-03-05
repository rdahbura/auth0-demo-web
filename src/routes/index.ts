import { Router } from 'express';

import authRouter from './auth';
import profileRouter from './profile';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../utils/constants';

import { isAuthenticated } from '../config/passport';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', {
    auth0Domain: AUTH0_DOMAIN,
    auth0ClientId: AUTH0_CLIENT_ID,
    name: 'index',
    title: 'Auth0 Demo Web App',
  });
});

router.use('/', authRouter);
router.use('/', isAuthenticated, profileRouter);

export default router;
