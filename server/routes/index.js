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

  // --- sessions --- //
  // creates a new session
  app.post('/api/sessions', sessionsController.create);
  // gets all sessions
  app.get('/api/sessions', sessionsController.getAll);

  // -- drills -- //
  // creates a new drill associated with a session
  app.post('/api/sessions/:session_id/drills', drillsController.create);

  // --- actions --- //
  // gets all actions
  app.get('/api/actions', actionsController.getAll);
  // creates a new action
  app.post('/api/actions', actionsController.create);
  
  // --- teams --- //
  // creates a new team
  app.post('/api/teams', teamsController.create);

  // --- players --- //
  // gets all players associated with an organization
  app.get('/api/organizations/:organization_id/players', organizationsController.getPlayersByOrganizationId)

  // --- events --- //
  // creates a new event
  app.post('/api/events', eventsController.create);
};
