const sessionsController = require('../controllers').sessions;
const drillsController = require('../controllers').drills;
const teamsController = require('../controllers').teams;
const playersController = require('../controllers').players;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Iso Athletic API!',
  }));

  // sessions
  app.post('/api/sessions', sessionsController.create);
  app.get('/api/sessions', sessionsController.getAll);

  // drills
  app.post('/api/sessions/:session_id/drills', drillsController.create);

  // teams
  app.post('/api/teams', teamsController.create);

  // players
  app.get('/api/players/:organization_id', playersController.getPlayersByOrganizationId)
};