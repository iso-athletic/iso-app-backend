const Drill = require('../models').Drill;

module.exports = {
  create(req, res) {
    return Drill
      .create({
        type: req.body.type,
        start_time: req.body.start_time,
        session_id: req.params.session_id,
      })
      .then(drill => res.status(201).send(drill))
      .catch(error => res.status(400).send(error));
  },
  getAll(req, res) {
    return Drill
      .all()
      .then(drill => res.status(200).send(drill))
      .catch(error => res.status.send(error));
  },
  update(req, res) {
    return Drill
    .update({
      end_time: req.body.end_time
    },
    { returning: true,
      where: 
      {
        id: req.params.drill_id
      } 
    })
    .then(drill => res.status(202).send(drill))
    .catch(error => res.status(400).send(error));
  },
  delete(req, res){
    Drill.destroy({
      where: { id: req.params.drill_id }
    })
    .then(drill => res.status(204).send(drill.id))
    .catch(error => res.status(400).send(error));
  }
};