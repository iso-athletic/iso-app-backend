const sessionsController = require('../controllers').sessions;
const drillsController = require('../controllers').drills;
const actionsController = require('../controllers').actions;
const teamsController = require('../controllers').teams;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Iso Athletic API!',
  }));

  // sessions
  app.post('/api/sessions', sessionsController.create);
  app.get('/api/sessions', sessionsController.getAll);

  // drills
  app.post('/api/sessions/:session_id/drills', drillsController.create);

  app.get('/api/actions', actionsController.getAll);
  app.post('/api/actions', actionsController.create);
  
  // teams
  app.post('/api/teams', teamsController.create);
};
