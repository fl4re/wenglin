'use strict';

const {expect} = require('chai');

const Player = require('../src/Player');
const {
  MU,
  SIGMA
} = require('../src/constants');

describe('Player', function () {

  it('Should be constructed with no arguments, using default values', function () {
    const player = new Player();

    expect(player.skill()).to.be.deep.equal({
      mu: MU,
      sigma: SIGMA,
      sigma_sq: SIGMA * SIGMA
    });

  });

  it('Should be constructed with custom arguments', function () {
    const custom_player_object = {
      id: 3,
      name: 'Player name'
    };

    const player = new Player({
      mu: 30,
      sigma: 2.45,
      ref: custom_player_object
    });

    expect(player.skill()).to.be.deep.equal({
      mu: 30,
      sigma: 2.45,
      sigma_sq: 6.002500000000001
    });

  });

  it('Should keep a custom reference', function () {
    const custom_player_object = {
      id: 3,
      name: 'Player name'
    };

    const player = new Player({
      ref: custom_player_object
    });

    expect(player.ref()).to.be.equal(custom_player_object);
  });


});
