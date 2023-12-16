/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  testMatch: ["<rootDir>/src/**/*.test.[jt]s?(x)"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};
