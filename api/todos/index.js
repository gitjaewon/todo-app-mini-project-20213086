const { app, connectToDatabase } = require('../../backend/index');

module.exports = async (req, res) => {
  req.url = '/api/todos';

  await connectToDatabase();
  return app(req, res);
};
