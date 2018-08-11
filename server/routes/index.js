const sessionsController = require('../controllers').sessions;
const drillsController = require('../controllers').drills;
const scrimmageAppsController = require('../controllers').scrimmageApps;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Iso Athletic API!',
  }));

  // sessions
  app.post('/api/sessions', sessionsController.create);
  app.get('/api/sessions', sessionsController.getAll);

  // drills
  app.post('/api/sessions/:session_id/drills', drillsController.create);

  // scrimmage app settings
  app.post('/api/test', scrimmageAppsController.read);
};