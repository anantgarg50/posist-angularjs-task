const environment = process.env.NODE_ENV;
const port = process.env.PORT;

const PORT = port
  ? port
  : environment === 'production'
    ? 3000
    : 5000;

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/posist-angularjs-task';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT Token Secret!';

const UNPROTECTED_ROUTES = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout'
];

module.exports = {
  PORT,
  DB_URL,
  JWT_SECRET,
  UNPROTECTED_ROUTES
};
