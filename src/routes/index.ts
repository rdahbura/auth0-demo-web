import { Router } from 'express';

import authRouter from './auth';
import privateRouter from './private';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_SCOPE } from '../utils/constants';

import { hasMfa, isAuthenticated } from '../config/passport';

const router = Router();

router.get('/', (req, res) => {
  res.render('index', {
    auth0Domain: AUTH0_DOMAIN,
    auth0ClientId: AUTH0_CLIENT_ID,
    auth0Scope: AUTH0_SCOPE,
    name: 'index',
    title: 'Auth0 Demo Web App',
  });
});

router.get('/callback-embedded', (req, res) => {
  res.render('callback-popup', {
    auth0Domain: AUTH0_DOMAIN,
    auth0ClientId: AUTH0_CLIENT_ID,
    name: 'callback-popup',
    title: 'Auth0 Demo Web App',
  });
});

router.get('/callback-popup', (req, res) => {
  res.render('callback-popup', {
    auth0Domain: AUTH0_DOMAIN,
    auth0ClientId: AUTH0_CLIENT_ID,
    name: 'callback-popup',
    title: 'Auth0 Demo Web App',
  });
});

router.get('/embedded', (req, res) => {
  res.render('embedded', {
    auth0Domain: AUTH0_DOMAIN,
    auth0ClientId: AUTH0_CLIENT_ID,
    auth0Scope: AUTH0_SCOPE,
    name: 'index',
    title: 'Auth0 Demo Web App',
  });
});

router.get('/embedded-lock', (req, res) => {
  res.render('embedded-lock', {
    auth0Domain: AUTH0_DOMAIN,
    auth0ClientId: AUTH0_CLIENT_ID,
    auth0Scope: AUTH0_SCOPE,
    name: 'index',
    title: 'Auth0 Demo Web App',
  });
});

router.get('/error', (req, res) => {
  const status = req.query['status'] || '';
  const stack = req.query['stack'] || '';
  res.render('error', {
    name: 'error',
    title: 'Auth0 Demo Web App - Error',
    message: 'We have a problem',
    error: {
      status: status,
      stack: stack,
    },
  });
});

router.get('/secret', hasMfa, (req, res) => {
  res.render('secret', {
    name: 'secret',
    title: 'Auth0 Demo Web App',
  });
});

router.use('/', authRouter);
router.use('/', isAuthenticated, privateRouter);

export default router;
