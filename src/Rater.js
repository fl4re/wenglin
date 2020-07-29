'use strict';

const assert = require('assert');

const Rating = require('./Rating');
const {
  BETA,
  EPSILON
} = require('./constants');

const score = function score(q, i) {
  if (q < i) return 1.0;
  if (q > i) return 0.0;
  return 0.5;
};

const sum = (a, b) => a + b;

module.exports = function(beta = BETA) {
  const beta_sq = beta * beta;

  const enhance_team = function (ranks) {
    return (team, team_index) => ({
      mu: team.players.map(({mu}) => mu).reduce(sum, 0),
      sigma_sq: team.players.map(({sigma_sq}) => sigma_sq).reduce(sum, 0),
      omega: 0.0,
      delta: 0.0,
      rank: ranks[team_index],
      players: team.players
    });
  };

  const enhance_teams = function (ranks) {
    return teams => {
      return teams.map(enhance_team(ranks));
    };
  };

  return function (teams, ranks) {
    assert.strictEqual(teams.length, ranks.length, 'teams and ranks vectors must be of the same length');
    teams = enhance_teams(ranks)(teams);

    teams.forEach(team_1 => {
      teams.forEach(team_2 => {
        if (team_1 == team_2) return;
        const c = Math.sqrt(team_1.sigma_sq + team_2.sigma_sq + 2.0 * beta_sq);
        const e1 = Math.exp(team_1.mu / c);
        const e2 = Math.exp(team_2.mu / c);
        const e12 = e1 + e2;
        let piq = e1 / e12;
        let pqi = e2 / e12;
        const s = score(team_2.rank, team_1.rank);
        const gamma = team_1.sigma_sq / c;
        team_1.omega += gamma * (s - piq);
        team_1.delta += Math.sqrt(team_1.sigma_sq) / c * (team_1.sigma_sq / (c * c)) * piq * pqi;
      });
    });

    const result = teams.reduce((result, team) => {
      const team_result = team.players.reduce((team_result, player) => {
        let new_mu = player.mu + (player.sigma_sq / team.sigma_sq) * team.omega;
        let sigma_adj = 1.0 - (player.sigma_sq / team.sigma_sq) * team.delta;
        const new_sigma_sq = player.sigma_sq * Math.max(sigma_adj, EPSILON);
        const rating = new Rating(new_mu, Math.sqrt(new_sigma_sq));

        return [...team_result, rating];
      }, []);
      return [...result, team_result];
    }, []);

    return result;
  };
};

