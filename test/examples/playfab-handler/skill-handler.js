'use strict';

const {expect} = require('chai');
const UpdateRatings = require('../../../examples/playfab_handlers/UpdateRatings');
const server_mock = require('./server_mock');

describe('examples', () => {

  describe('playfab_handler', () => {

    describe('skill_handler', () => {

      it('Should update all players ratings', () => {
        const globals = {server: server_mock()};

        const update_ratings = UpdateRatings(globals);

        const teams = {
          team_1: {players: ['PLAYER_A_1', 'PLAYER_A_2', 'PLAYER_A_3', 'PLAYER_A_4'], score: 0},
          team_2: {players: ['PLAYER_B_1', 'PLAYER_B_2', 'PLAYER_B_3', 'PLAYER_B_4'], score: 100}
        };

        update_ratings(teams);

        for (let i = 0; i < 4; i++) {
          expect(globals.server.UpdateUserReadOnlyData.getCall(i)).to.be.deep.equal({
            PlayfabId: `PLAYER_A_${i + 1}`,
            Skill: {mu: 23.570710703763087, sigma: 8.248813055380475, sigma_sq: 68.04291682261538}
          });
        }
        for (let i = 0; i < 4; i++) {
          expect(globals.server.UpdateUserReadOnlyData.getCall(i + 4)).to.be.deep.equal({
            PlayfabId: `PLAYER_B_${i + 1}`,
            Skill: {mu: 26.429289296236913, sigma: 8.248813055380475, sigma_sq: 68.04291682261538 }
          });
        }
      });

    });

  });

});
