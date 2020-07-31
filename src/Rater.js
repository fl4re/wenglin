'use strict';

const Player = require('./Player');
const {
  BETA,
  EPSILON
} = require('./constants');

const score = function score(q, i) {
  if (q < i) return 1.0;
  if (q > i) return 0.0;
  return 0.5;
};

module.exports = function(beta = BETA) {
  const beta_sq = beta * beta;

  return function (...teams) {
    teams.forEach(team_1 => {
      teams.forEach(team_2 => {
        if (team_1 == team_2) return;
        const c = Math.sqrt(team_1.sigma_sq() + team_2.sigma_sq() + 2.0 * beta_sq);
        const e1 = Math.exp(team_1.mu() / c);
        const e2 = Math.exp(team_2.mu() / c);
        const e12 = e1 + e2;
        let piq = e1 / e12;
        let pqi = e2 / e12;
        const s = score(team_2.score(), team_1.score());
        const gamma = team_1.sigma_sq() / c;
        team_1.increase_omega(gamma * (s - piq));
        team_1.increase_delta(Math.sqrt(team_1.sigma_sq()) / c * (team_1.sigma_sq() / (c * c)) * piq * pqi);
      });
    });

    return teams.reduce((result, team) => {
      const team_result = team.players().map(player => {
        let mu = player.mu() + (player.sigma_sq() / team.sigma_sq()) * team.omega();
        let sigma_adj = 1.0 - (player.sigma_sq() / team.sigma_sq()) * team.delta();
        const sigma = Math.sqrt(player.sigma_sq() * Math.max(sigma_adj, EPSILON));

        return new Player({mu, sigma, ref: player.ref()});
      }, []);
      return [...result, ...team_result];
    }, []);
  };
};

