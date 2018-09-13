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
  app.put('/api/sessions/:session_id', sessionsController.update);
  app.delete('/api/sessions/:session_id', sessionsController.delete);

  // --- organizations --- //
  // gets organization info
  app.get('/api/organizations/:organization_id', organizationsController.getOrganizationInfo);

  // -- drills -- //
  // creates a new drill associated with a session
  app.post('/api/sessions/:session_id/drills', drillsController.create);
  app.put('/api/drills/:drill_id', drillsController.update);
  app.delete('/api/drills/:drill_id', drillsController.delete);

  // --- actions --- //
  // gets all actions
  app.get('/api/actions', actionsController.getAll);
  // creates a new action
  app.post('/api/actions', actionsController.create);
  // deletes an action
  app.delete('/api/actions/:action_id', actionsController.delete);

  // --- teams --- //
  // creates a new team
  app.post('/api/teams', teamsController.create);
  // deletes a teams
  app.delete('/api/teams/:team_id', teamsController.delete);

  // --- players --- //
  // gets all players associated with an organization
  app.get('/api/organizations/:organization_id/players', organizationsController.getPlayersByOrganizationId)

  // --- events --- //
  // creates a new event
  app.post('/api/drills/:drill_id/events', eventsController.create);
};
