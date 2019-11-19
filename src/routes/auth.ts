import { Router } from 'express';
import { URL } from 'url';
import { authenticate } from 'passport';
import { stringify } from 'querystring';

import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../utils/constants';

const router = Router();

router.get(
  '/login',
  authenticate('auth0', {
    scope: 'openid profile email',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

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
    req.logIn(user, function(err) {
      if (err) {
        next(err);
        return;
      }
      const returnTo = req.session?.returnTo;
      delete req.session?.returnTo;
      res.redirect(returnTo || '/profile');
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  const returnURL = new URL(`${req.protocol}://${req.hostname}`);

  const port = req.connection.localPort;
  returnURL.port = port.toString();

  const logoutURL = new URL(`https://${AUTH0_DOMAIN}/logout`);
  logoutURL.search = stringify({
    client_id: AUTH0_CLIENT_ID,
    returnTo: returnURL.toString(),
  });

  req.logout();
  res.redirect(logoutURL.toString());
});

export default router;
