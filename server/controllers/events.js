const Event = require('../models').Event;
const Player = require('../models').Player;
const moment = require('moment');

module.exports = {
  create(req, res) {
    return Event
      .create({
        action_id: req.body.action_id,
        player_id: req.body.player_id,
        team_id: req.body.team_id,
        drill_id: req.params.drill_id,
        location: req.body.location,
        timestamp: req.body.timestamp
      })
      .then(event=> res.status(201).send(event))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    Event.destroy({
      where: { id: req.params.event_id}
    })
    .then(event => res.status(204).send(event.id))
    .catch(error => res.status(400).send(error));
  },


  getAllShotsForOrganization(req, res){
    return Event
      .findAll({
        where: {
          timestamp: {
            $between: [moment.unix(req.params.date_from).format('YYYY-MM-DD HH:MM:SS'), moment.unix(req.params.date_to).format('YYYY-MM-DD HH:MM:SS')]
          },
          $or: [{action_id: "Made Shot"}, {action_id: "Missed Shot"}],
          player_id: {
            $in: {
                include: [{
                model: Player,
                where: {organization_id: req.params.organization_id}
              }]
            }
          }
        }
      })
      .then(event=>res.status(201).send(event))
      .catch(error => res.status(400).send(error));
      ;
  }

};
