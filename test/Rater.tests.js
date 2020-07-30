'use strict';

const {expect} = require('chai');

const Rater = require('../src/Rater');
const Team = require('../src/Team');
const Player = require('../src/Player');

describe('Rater', function () {

  it('Should update both teams with same skill after a draw', function () {
    const team_1 = new Team({players: [new Player(), new Player()], score: 50});
    const team_2 = new Team({players: [new Player(), new Player()], score: 50});

    const players = Rater()(team_1, team_2);

    expect(players[0].map(player => player.skill())).to.be.deep.equal(
      [
        {mu: 25, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},
        {mu: 25, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}
      ]
    );
    expect(players[1].map(player => player.skill())).to.be.deep.equal([
      {mu: 25, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},
      {mu: 25, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}

    ]);
  });

  it('Should update mu and sigma accordingly to ranks', function () {
    const team_1 = new Team({players: [new Player(), new Player()], score: 1});
    const team_2 = new Team({players: [new Player(), new Player()], score: 99});

    const players = Rater()(team_1, team_2);

    expect(players[0].map(player => player.skill())).to.be.deep.equal([
      {mu: 23.035814496704035, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},
      {mu: 23.035814496704035, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}
    ]);
    expect(players[1].map(player => player.skill())).to.be.deep.equal([
      {mu: 26.964185503295965, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},
      {mu: 26.964185503295965, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}
    ]);
  });

});
