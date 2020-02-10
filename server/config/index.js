const environment = process.env.NODE_ENV;
const port = process.env.PORT;

const PORT = port
  ? port
  : environment === 'production'
    ? 3000
    : 5000;

module.exports = {
  PORT
};
