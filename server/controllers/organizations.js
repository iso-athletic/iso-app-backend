const Player = require('../models').Player;

module.exports = {
  getPlayersByOrganizationId(req, res) {
    return Player
      .findAll({
        where: { organization_id: req.params.organization_id }
      })
      .then(players => {
        if (!players) {
          return res.status(404).send({
            message: 'Players Not Found',
          });
        }
        return res.status(200).send(players);
      })
      .catch(error => res.status(400).send(error));
  }
};