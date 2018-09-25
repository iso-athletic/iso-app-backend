const Stats = require('../models').Stats;

module.exports = {
  getAll(req, res) {
    return Stats
      .all( {where: { drill_id: req.params.drill_id }})
      .then(stats => res.status(200).send(stats))
      .catch(error => res.status(400).send(error));
  }
};
