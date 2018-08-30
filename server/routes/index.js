const sessionsController = require('../controllers').sessions;
const drillsController = require('../controllers').drills;
const actionsController = require('../controllers').actions;
const teamsController = require('../controllers').teams;
const organizationsController = require('../controllers').organizations;
const eventsController = require('../controllers').events;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Iso Athletic API!',
  }));

  // sessions
  app.post('/api/sessions', sessionsController.create);
  app.get('/api/sessions', sessionsController.getAll);
  app.put('/api/sessions/:session_id', sessionsController.update);

  // drills
  app.post('/api/sessions/:session_id/drills', drillsController.create);
  app.put('/api/drills/:drill_id', drillsController.update);

  app.get('/api/actions', actionsController.getAll);
  app.post('/api/actions', actionsController.create);
  
  // teams
  app.post('/api/teams', teamsController.create);

  // organizations
  app.get('/api/organizations/:organization_id/players', organizationsController.getPlayersByOrganizationId);

  // events
  app.post('/api/drills/:drill_id/events', eventsController.create);
};
