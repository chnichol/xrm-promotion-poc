const CANNOT_SET_FUTURE_DATE = 'Cannot set future date';
const CANNOT_SET_FUTURE_DATE_ID = 'CANNOT_SET_FUTURE_DATE';

const RECORD_MUST_BE_SAVED = 'Cannot set field until record saved';
const RECORD_MUST_BE_SAVED_ID = 'RECORD_MUST_BE_SAVED';

const LOCALHOST = 'http://localhost:3000';
const WEBAPI = `${typeof(process) === 'object' ? LOCALHOST : ''}/api/data/v9.0`;
const WHOAMI = 'WhoAmI';
const GET = 'GET';
const POST = 'POST';
const PATCH = 'PATCH';
const DELETE = 'DELETE';
const CLIENT_URL = typeof(location) === 'object' && location.origin;
const FORM_TYPE_CREATE = 1;
const FORM_TYPE_UPDATE = 2;

export {
  CANNOT_SET_FUTURE_DATE,
  CANNOT_SET_FUTURE_DATE_ID,
  RECORD_MUST_BE_SAVED,
  RECORD_MUST_BE_SAVED_ID,
  LOCALHOST,
  WEBAPI,
  WHOAMI,
  GET,
  POST,
  PATCH,
  DELETE,
  CLIENT_URL,
  FORM_TYPE_CREATE,
  FORM_TYPE_UPDATE
};