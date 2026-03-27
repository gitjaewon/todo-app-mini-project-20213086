const { app, connectToDatabase } = require('../../backend/index');

module.exports = async (req, res) => {
  const todoId = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
  req.url = `/api/todos/${todoId}`;

  await connectToDatabase();
  return app(req, res);
};
