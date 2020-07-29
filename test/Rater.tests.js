'use strict';

const {expect} = require('chai');

const Rater = require('../src/Rater');
const Team = require('../src/Team');
const Player = require('../src/Player');

describe('Rater', function() {

  it('Should update both teams with same skill after a draw', function () {
    const teams = [
      new Team([new Player(), new Player()]),
      new Team([new Player(), new Player()])
    ];

    const ranks = [50, 50];
    const rates = Rater()(teams, ranks);

    expect(rates).to.be.deep.equal([
      [
        {mu: 25, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},
        {mu: 25, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}
      ],
      [
        {mu: 25, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},
        {mu: 25, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}
      ]
    ]);
  });

  it('Should update mu and sigma accordingly to ranks', function () {
    const teams = [
      new Team([new Player(), new Player()]),
      new Team([new Player(), new Player()])
    ];

    const ranks = [1, 99];
    const rates = Rater()(teams, ranks);

    expect(rates).to.be.deep.equal([
      [
        {mu: 23.035814496704035, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},
        {mu: 23.035814496704035, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}
      ],
      [
        {mu: 26.964185503295965, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},
        {mu: 26.964185503295965, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}
      ]
    ]);
  });

});
