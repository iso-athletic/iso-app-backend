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
          [Stats.sequelize.fn('AVG', Stats.sequelize.col('fg%')), 'fgp'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('2p')), 'twop'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('2pa')), 'twopa'],
          [Stats.sequelize.fn('AVG', Stats.sequelize.col('2p%')), 'twopp'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('3p')), 'threep'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('3pa')), 'threepa'],
          [Stats.sequelize.fn('AVG', Stats.sequelize.col('3p%')), 'threepp'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('3par')), '3par'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('pts')), 'pts'],
          [Stats.sequelize.fn('AVG', Stats.sequelize.col('ts%')), 'tsp'],
          [Stats.sequelize.fn('AVG', Stats.sequelize.col('efg%')), 'efgp'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('ft')), 'ft'],
          [Stats.sequelize.fn('SUM', Stats.sequelize.col('fta')), 'fta'],
          [Stats.sequelize.fn('AVG', Stats.sequelize.col('ft%')), 'ftp'],
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
    },

    updateStatsTable(req, res) {
      Stats.sequelize.query('SELECT updateStatsTable(:target_organization_id, :target_date_scrimmage)', 
      { replacements: 
        { 
          target_organization_id: req.params.organization_id,
          target_date_scrimmage: req.body.date 
        }, 
        type: Stats.sequelize.QueryTypes.SELECT 
      })
      .then(res.status(202).send())
      .catch(error => res.status(400).send(error))
    }
  }
