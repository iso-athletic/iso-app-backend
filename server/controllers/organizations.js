const Player = require('../models').Player;
const Organization = require('../models').Organization;

module.exports = {
  getPlayersByOrganizationId(req, res) {
    return Player
      .findAll({
        where: { organization_id: req.params.organization_id }
      })
      .then(players => {
        if (!players) {
          return res.status(404).send({
            message: 'No players found',
          });
        }
        return res.status(200).send(players);
      })
      .catch(error => res.status(400).send(error));
  },
  getOrganizationInfo(req, res) {
    return Organization
      .find({
        where: { id: req.params.organization_id }
      })
      .then(organization => {
        if (!organization) {
          return res.status(404).send({
            message: 'Organization not found'
          });
        }
        return res.status(200).send(organization);
      })
      .catch(error => res.status(400).send(error));
  }

};
