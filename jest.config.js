/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // testMatch: ["**/?(*.)+(test).ts"],
  testMatch: ['<rootDir>/tests/unit/news.test.ts'],
};
