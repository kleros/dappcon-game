"use strict";
export const GAME_END_TIMESTAMP = 1751579999; // Timestamp in seconds when the game ends
const GAME_CONCLUDES_TIMESTAMP = 1751622446; // Timestamp in seconds when the game concludes
export const TOKEN_DISTRIBUTION_TIMESTAMP = 1753912799; // Timestamp in seconds for token distribution

export const QR_CODE_EXPIRY = 2 * 60 * 1000; // (2 minutes) Expiry time in seconds for QR code
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
