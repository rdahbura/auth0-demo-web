import 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import session from 'express-session';

import logger from './utils/logger';
import { COOKIE_SECRET, PORT, isProduction } from './utils/constants';
import { error, errorLogger, routeNotFound } from './utils/errors';

import routes from './routes';

const app = express();

// Assign application settings
app.set('port', PORT);
app.set('views', path.join(__dirname, '../views/pages'));
app.set('view engine', 'pug');

// Configure logging
app.use(morgan('dev'));

// Configure middleware
app.use(helmet());
app.use(cookieParser());
app.use(
  session({
    cookie: {
      secure: isProduction(),
    },
    resave: false,
    saveUninitialized: true,
    secret: COOKIE_SECRET,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// Handle auth failure error messages
app.use(function(req, res, next) {
  if (req.query?.error) {
    req.flash('error', req.query.error);
  }
  if (req.query?.error_description) {
    req.flash('error_description', req.query.error_description);
  }
  next();
});

// Configure static assets
app.use(express.static(path.join(__dirname, '../public')));

// Configure routes
app.use('/', routes);
app.use(routeNotFound);

// Configure error handlers
app.use(errorLogger);
app.use(error);

// Start the server
const server = app.listen(PORT, () => {
  logger.info(`Server started listening on port ${PORT}...`);
});

async function shutdown(): Promise<void> {
  server.close();
}

const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
signals.forEach((v) => {
  process.on(v, async () => {
    await shutdown();
    process.exit();
  });
});
