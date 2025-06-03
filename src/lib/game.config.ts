"use strict";
export const GAME_END_TIMESTAMP = 1749559005; // Timestamp in seconds when the game ends (Fri May 24 2024 00:00:00 GMT+0000)
const GAME_CONCLUDES_TIMESTAMP = 1749645405; // Timestamp in seconds when the game concludes (Mon Jun 10 2024 00:00:00 GMT+0000)
export const TOKEN_DISTRIBUTION_TIMESTAMP = 1749731805; // Timestamp in seconds for token distribution (Mon Jul 29 2024 00:00:00 GMT+0000)

export const QR_CODE_EXPIRY =2 * 60 * 1000; // (2 minutes) Expiry time in seconds for QR code
export const QUESTION_TIMEOUT_WINDOW = 3 * 60 * 1000; // (3 minutes) Player cannot answer after question gets timeout

export const TOTAL_PNK = 1000000; // Total PNK to be distributed

export const isGameEnded = (): boolean => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return currentTimestamp > GAME_END_TIMESTAMP;
};

export const isGameConcluded = (): boolean => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  return currentTimestamp >= GAME_CONCLUDES_TIMESTAMP;
};
