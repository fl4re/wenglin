'use strict';

const Z = 3;
const MU = 25;
const SIGMA = MU / Z;
const BETA = SIGMA / 2;
const BETA_SQUARE = BETA * BETA;
const SIGMA_SQUARE = SIGMA * SIGMA;
const EPSILON = 0.0001;

module.exports = {
  MU,
  SIGMA,
  SIGMA_SQUARE,
  BETA,
  BETA_SQUARE,
  EPSILON
};
