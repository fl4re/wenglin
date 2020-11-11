'use strict';

const Rater = require('../../src/Rater');
const Team = require('../../src/Team');
const Player = require('../../src/Player');

const BETA = 4.16;
const Keys = ['Skill'];

module.exports = globals => teams => {
  const {server} = globals;

  const team_1_skills = teams.team_1.players.map(PlayfabId => {
    const playerSkill = server.GetUserReadOnlyData({PlayfabId, Keys});
    return new Player({...playerSkill, ref: PlayfabId});
  });

  const team_2_skills = teams.team_2.players.map(PlayfabId => {
    const playerSkill = server.GetUserReadOnlyData({PlayfabId, Keys});
    return new Player({...playerSkill, ref: PlayfabId});
  });

  const team_1 = new Team({players: team_1_skills, score: teams.team_1.score});
  const team_2 = new Team({players: team_2_skills, score: teams.team_2.score});

  const players = Rater(BETA)(team_1, team_2);

  return players.map(player => {
    server.UpdateUserReadOnlyData({
      PlayfabId: player.ref(),
      Skill: player.skill()
    });
  });
};
