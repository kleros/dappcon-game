"use strict";
const GAME_END_TIMESTAMP = 1716508800; // Timestamp in seconds when the game ends (Fri May 24 2024 00:00:00 GMT+0000)
const GAME_CONCLUDES_TIMESTAMP = 1717977600; // Timestamp in seconds when the game concludes (Mon Jun 10 2024 00:00:00 GMT+0000)
export const TOKEN_DISTRIBUTION_TIMESTAMP = 1722211200; // Timestamp in seconds for token distribution (Mon Jul 29 2024 00:00:00 GMT+0000)

export const isGameEnded = (): boolean => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return currentTimestamp > GAME_END_TIMESTAMP;
};

export const isGameConcluded = (): boolean => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return currentTimestamp >= GAME_CONCLUDES_TIMESTAMP;
};