const Event = require('../models').Event;

module.exports = {
  create(req, res) {
    return Event
      .create({
        action_id: req.body.action_id,
        player_id: req.body.player_id,
        team_id: req.body.team_id,
        drill_id: req.body.drill_id,
        location: req.body.location,
        timestamp: req.body.timestamp
      })
      .then(event => res.status(201).send(event))
      .catch(error => res.status(400).send(error));
  }
};