'use strict';

class Team {
  constructor({players, score}) {
    this._players = players;
    this._score = score;
    this._omega = 0.0;
    this._delta = 0.0;
  }

  sum(a, b) {
    return a + b;
  }

  mu() {
    return this._players
      .map(player => player.mu())
      .reduce(this.sum, 0);
  }

  sigma_sq() {
    return this._players
      .map(player => player.sigma_sq())
      .reduce(this.sum, 0);
  }

  omega() {
    return this._omega;
  }

  delta() {
    return this._delta;
  }

  score() {
    return this._score;
  }

  players() {
    return this._players;
  }

  increase_omega(omega_increment) {
    this._omega += omega_increment;
  }

  increase_delta(delta_increment) {
    this._delta += delta_increment;
  }

}

module.exports = Team;
