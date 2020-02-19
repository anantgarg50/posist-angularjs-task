const environment = process.env.NODE_ENV;
const port = process.env.PORT;

const PORT = port
  ? port
  : environment === 'production'
    ? 3000
    : 5000;

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/posist-angularjs-task';

module.exports = {
  PORT,
  DB_URL
};
