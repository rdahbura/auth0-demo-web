const ACR_VALUES =
  'http://schemas.openid.net/pape/policies/2007/06/multi-factor';

const AUTH0_CALLBACK_URL = process.env.AUTH0_CALLBACK_URL || '';
const AUTH0_CALLBACK_POPUP_URL = process.env.AUTH0_CALLBACK_POPUP_URL || '';
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || '';
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET || '';
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || '';
const AUTH0_SCOPE = 'openid profile email';
const COOKIE_SECRET = process.env.COOKIE_SECRET || '';
const NODE_ENV = process.env.NODE_ENV || '';
const PORT = process.env.PORT || 5000;

const isProduction = (): boolean => {
  return NODE_ENV === 'production';
};

export {
  ACR_VALUES,
  AUTH0_CALLBACK_URL,
  AUTH0_CALLBACK_POPUP_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  AUTH0_SCOPE,
  COOKIE_SECRET,
  NODE_ENV,
  PORT,
  isProduction,
};
