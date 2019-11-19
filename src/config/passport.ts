import { NextFunction, Request, Response } from 'express';

import passport from 'passport';
import passportAuth0 from 'passport-auth0';

import {
  AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
} from '../utils/constants';

const Auth0Strategy = passportAuth0.Strategy;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Configure Passport to use Auth0
passport.use(
  new Auth0Strategy(
    {
      callbackURL: AUTH0_CALLBACK_URL,
      clientID: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      domain: AUTH0_DOMAIN,
    },
    (accessToken, refreshToken, extraParams, profile, done) =>
      done(null, profile)
  )
);

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};
