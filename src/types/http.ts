import { STATUS_CODES } from 'http';
import passportAuth0 from 'passport-auth0';

export interface ExtraVerificationParamsWithToken
  extends passportAuth0.ExtraVerificationParams {
  id_token?: string;
}

export class HttpError extends Error {
  status: number;
  errors: object[] | undefined;

  constructor(status: number, message?: string, errors?: object[]) {
    super(message || STATUS_CODES[status] || status.toString());
    Object.setPrototypeOf(this, new.target.prototype);

    this.status = status;
    this.errors = errors;
  }
}
