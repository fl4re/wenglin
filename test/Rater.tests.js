'use strict';

const {expect} = require('chai');

const Rater = require('../src/Rater');
const Team = require('../src/Team');
const Player = require('../src/Player');

describe('Rater', function () {

  it('Should update both teams with same skill after a draw', function () {
    const team_1 = new Team({players: [new Player(), new Player()], score: 50});
    const team_2 = new Team({players: [new Player(), new Player()], score: 50});

    const result = Rater()(team_1, team_2);

    expect(result.map(it => it.skill())).to.be.deep.equal(
      [
        {mu: 25, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},
        {mu: 25, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},
        {mu: 25, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},
        {mu: 25, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}
      ]);
  });

  it('Should update mu and sigma accordingly to ranks', function () {
    const team_1 = new Team({players: [new Player(), new Player()], score: 1});
    const team_2 = new Team({players: [new Player(), new Player()], score: 99});

    const result = Rater()(team_1, team_2);

    expect(result.map(it => it.skill())).to.be.deep.equal([
      {mu: 23.035814496704035, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},
      {mu: 23.035814496704035, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},
      {mu: 26.964185503295965, sigma: 8.17755635771097, sigma_sq: 66.8724279835391},
      {mu: 26.964185503295965, sigma: 8.17755635771097, sigma_sq: 66.8724279835391}
    ]);
  });

  it('Should keep players\' references', function () {
    const player_1_ref = {id: 1};
    const player_2_ref = {id: 2};
    const player_3_ref = {id: 3};
    const player_4_ref = {id: 4};
    const team_1 = new Team({players: [new Player({ref: player_1_ref}), new Player({ref: player_2_ref})], score: 1});
    const team_2 = new Team({players: [new Player({ref: player_3_ref}), new Player({ref: player_4_ref})], score: 99});

    const result = Rater()(team_1, team_2);

    expect(result.map(it => it.ref())).to.be.deep.equal([
      player_1_ref, player_2_ref, player_3_ref, player_4_ref
    ]);
  });

});


