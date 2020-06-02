import { NextFunction, Request, Response } from 'express';

import passport from 'passport';
import passportAuth0 from 'passport-auth0';
import * as jwt from 'jsonwebtoken';

import {
  AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
} from '../utils/constants';
import { ExtraVerificationParamsWithToken } from '../types/http';

const strategy = new passportAuth0.Strategy(
  {
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    callbackURL: AUTH0_CALLBACK_URL,
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, extraParams, profile, done) => {
    const extraParamsWithToken = extraParams as ExtraVerificationParamsWithToken;
    if (req.session) {
      req.session.id_token = jwt.decode(extraParamsWithToken.id_token || '');
    }
    return done(null, profile);
  }
);

// Configure Passport to use Auth0
passport.use(strategy);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export const hasMfa = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const id_token = req.session?.id_token;
  if (id_token?.amr?.['mfa']) {
    return next();
  }
  res.redirect('/login-mfa');
};

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
