const { app, connectToDatabase } = require('../backend/index');

module.exports = async (req, res) => {
  if (!req.url.startsWith('/api')) {
    req.url = `/api${req.url.startsWith('/') ? '' : '/'}${req.url}`;
  }

  await connectToDatabase();
  return app(req, res);
};
