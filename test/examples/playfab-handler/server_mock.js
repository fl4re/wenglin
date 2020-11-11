'use strict';

const DEFAULT_SKILL = {mu: 25, sigma: 25 / 3};

module.exports = () => {
  const calls = [];
  const GetUserReadOnlyData = () => DEFAULT_SKILL;
  const UpdateUserReadOnlyData = (...args) => {
    calls.push(...args);
  };

  UpdateUserReadOnlyData.getCall = call_index => {
    return calls[call_index];
  };

  return {
    GetUserReadOnlyData,
    UpdateUserReadOnlyData
  };
};
