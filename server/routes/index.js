const sessionsController = require('../controllers').sessions;
const drillsController = require('../controllers').drills;
const actionsController = require('../controllers').actions;
const teamsController = require('../controllers').teams;
const organizationsController = require('../controllers').organizations;
const eventsController = require('../controllers').events;
const statsController = require('../controllers').stats;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Iso Athletic API!',
  }));

  // --- sessions --- //
  // creates a new session
  app.post('/api/sessions', sessionsController.create);
  // updates a session
  app.put('/api/sessions/:session_id', sessionsController.update);
  // deletes a session
  app.delete('/api/sessions/:session_id', sessionsController.delete);

  // --- organizations --- //
  // gets organization info
  app.get('/api/organizations/:organization_id', organizationsController.getOrganizationInfo);
  //updates default time
  app.put('/api/organizations/:organization_id', organizationsController.updatedefaultTime);
  // gets all sessions that were started and completed
  app.get('/api/organizations/:organization_id/sessions', sessionsController.getAll);

  // -- drills -- //
  // creates a new drill associated with a session
  app.post('/api/sessions/:session_id/drills', drillsController.create);
  app.put('/api/drills/:drill_id', drillsController.update);
  //deletes a drill
  app.delete('/api/drills/:drill_id', drillsController.delete);

  // --- actions --- //
  // gets all actions
  app.get('/api/organizations/:organization_id/actions', actionsController.getAll);
  app.put('/api/organizations/:organization_id/actions', actionsController.update);
  // // creates a new action
  // app.post('/api/actions', actionsController.create);
  // // deletes an action
  // app.delete('/api/actions/:action_id', actionsController.delete);

  // --- teams --- //
  // creates a new team
  app.post('/api/teams', teamsController.create);
  // deletes a teams
  app.delete('/api/teams/:team_id', teamsController.delete);

  // --- players --- //
  // gets all players associated with an organization
  app.get('/api/organizations/:organization_id/players', organizationsController.getPlayersByOrganizationId);
  // creates a new player
  app.post('/api/organizations/:organization_id/players', organizationsController.createPlayer);
  // updates a player's information
  app.put('/api/players/:player_id', organizationsController.updatePlayer);
  // deletes a players
  app.delete('/api/players/:player_id', organizationsController.deletePlayer);

  // --- events --- //
  // creates a new event
  app.post('/api/drills/:drill_id/events', eventsController.create);
  // deletes an event
  app.delete('/api/events/:event_id', eventsController.delete);

  // --- stats --- //
  // gets all stats from drills over specific dates
  app.get('/api/organizations/:organization_id/stats/:date_from-:date_to', statsController.getAll);
  // updates the stats table with stats from just completed practice
  app.put('/api/organizations/:organization_id/stats', statsController.updateStatsTable);
};
