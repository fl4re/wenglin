'use strict';

const {
  MU,
  SIGMA_SQUARE,
} = require('./constants');

class Player {
  constructor(mu, sigma_sq) {
    this.mu = mu || MU;
    this.sigma_sq = sigma_sq || SIGMA_SQUARE;
    this.sigma = Math.sqrt(this.sigma_sq);
  }

  static from_rating(rating) {
    return new Player(rating.mu, rating.sigma_sq);
  }

  mu () {
    return this.mu;
  }

  sigma_sq () {
    return this.sigma_sq;
  }
}

module.exports = Player;
