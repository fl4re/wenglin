'use strict';

const {
  MU,
  SIGMA
} = require('./constants');

class Player {
  constructor(mu, sigma) {
    this._mu = mu || MU;
    this._sigma = sigma || SIGMA;
    this._sigma_sq = this._sigma * this._sigma;
  }

  mu () {
    return this._mu;
  }

  sigma_sq () {
    return this._sigma_sq;
  }

  skill () {
    return {
      mu: this._mu,
      sigma_sq: this._sigma_sq,
      sigma: this._sigma,
    };
  }
}

module.exports = Player;
