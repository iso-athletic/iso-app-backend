const Stats = require('../models').Stats;

module.exports = {
  getAll(req, res) {
    return Stats
      .all()
      .then(stats => res.status(200).send(stats))
      .catch(error => res.status(400).send(error));
  }
};
