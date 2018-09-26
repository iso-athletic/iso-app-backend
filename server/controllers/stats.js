const Stats = require('../models').Stats;
const moment = require('moment');

module.exports = {
  getAll(req, res) {
    return Stats
      .all({
        attributes: [
          'player_name',
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('fg')), 'fg'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('fga')), 'fga'],
          [Stats.sequelize.fn('AVG', Stats.sequelize.col('fg%')), 'fg%'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('2p')), '2p'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('2pa')), '2pa'],
          [Stats.sequelize.fn('AVG', Stats.sequelize.col('2p%')), '2p%'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('3p')), '3p'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('3pa')), '3pa'],
          [Stats.sequelize.fn('AVG', Stats.sequelize.col('3p%')), '3p%'],
        //  [Stats.sequelize.fn('SUM', Stats.sequelize.col('3par')), '3par'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('pts')), 'pts'],
          [Stats.sequelize.fn('AVG', Stats.sequelize.col('ts%')), 'ts%'],
          [Stats.sequelize.fn('AVG', Stats.sequelize.col('efg%')), 'efg%'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('ft')), 'ft'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('fta')), 'fta'],
          [Stats.sequelize.fn('AVG', Stats.sequelize.col('ft%')), 'ft%'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('ftr')), 'ftr'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('oreb')), 'oreb'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('dreb')), 'dreb'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('reb')), 'reb'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('ast')), 'ast'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('stl')), 'stl'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('blk')), 'blk'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('tov')), 'tov'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('pf')), 'pf'],
        ],
        where: {
          date_scrimmage: {
            $between: [moment.unix(req.params.date_from).format('YYYY-MM-DD'), moment.unix(req.params.date_to).format('YYYY-MM-DD')]
          },
          organization_id: req.params.organization_id
        },
        group: ['player_name'],
      })
      .then(stats => res.status(200).send(stats))
      .catch(error => res.status(400).send(error));
    }
  }
