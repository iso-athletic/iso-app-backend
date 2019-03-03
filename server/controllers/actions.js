const Action = require('../models').Action;

// we'll probably want to cache information like this
// since it won't change that much session to session

module.exports = {
  getAll(req, res) {
    return Action
      .findAll({
        where: {id: req.params.organization_id}
      })
      .then(action => res.status(200).send(action))
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Action
    .update({
      twopt_make: req.body.twopt_make,
      threept_make: req.body.threept_make,
      ft: req.body.ft,
      twopt_miss: req.body.twopt_miss,
      threept_miss: req.body.threept_miss,
      assist: req.body.assist,
      turnover: req.body.turnover,
      off_reb: req.body.off_reb,
      def_reb: req.body.def_reb,
      steal: req.body.steal,
      block: req.body.block,
      foul: req.body.foul,
    },
    {
      returning: true,
      where:
      {
        id: req.params.organization_id
      }
    })
    .then(action => res.status(202).send(action))
    .catch(error => res.status(400).send(error));
  },
};
