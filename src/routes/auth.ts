import { Router } from 'express';
import { URL } from 'url';
import { authenticate } from 'passport';
import { stringify } from 'querystring';

import {
  ACR_VALUES,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  AUTH0_SCOPE,
} from '../utils/constants';
import { AuthenticateOptions } from 'passport-auth0';

interface AuthenticateOptionsExt extends AuthenticateOptions {
  acr_values?: string;
}

const router = Router();

router.get('/callback', (req, res, next) => {
  authenticate('auth0', (err, user) => {
    if (err) {
      next(err);
      return;
    }
    if (!user) {
      res.redirect('/login');
      return;
    }
    req.logIn(user, function (err) {
      if (err) {
        next(err);
        return;
      }
      const returnTo = req.session?.returnTo;
      delete req.session?.returnTo;
      res.redirect(returnTo || '/');
    });
  })(req, res, next);
});

router.get(
  '/login',
  (req, res, next) => {
    authenticate('auth0', {
      scope: AUTH0_SCOPE,
    })(req, res, next);
  },
  (req, res) => {
    res.redirect('/');
  }
);

router.get(
  '/login-mfa',
  (req, res, next) => {
    authenticate('auth0', {
      acr_values: ACR_VALUES,
      scope: AUTH0_SCOPE,
    } as AuthenticateOptionsExt)(req, res, next);
  },
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  const returnURL = new URL(`${req.protocol}://${req.hostname}`);
  returnURL.port = req.connection.localPort.toString();

  const logoutURL = new URL(`https://${AUTH0_DOMAIN}/logout`);
  logoutURL.search = stringify({
    client_id: AUTH0_CLIENT_ID,
    returnTo: returnURL.toString(),
  });

  req.logout();
  res.redirect(logoutURL.toString());
});

export default router;
