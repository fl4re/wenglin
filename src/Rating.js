'use strict';

class Rating {
  constructor(mu, sigma) {
    this.mu = mu;
    this.sigma = sigma;
    this.sigma_sq = Math.pow(sigma, 2.0);
  }

  mu() {
    return this.mu;
  }

  sigma() {
    return this.sigma;
  }

  static default() {
    const mu = 25.0;
    const sigma = 25.0 / 3.0;
    const sigma_sq = Math.pow(sigma, 2.0);
    return new Rating(mu, sigma, sigma_sq);
  }
}

module.exports = Rating;
