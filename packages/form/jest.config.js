/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  testEnvironment: "jest-environment-jsdom",
  setupFiles: [require.resolve("./jest.setupTests")],
  setupFilesAfterEnv: [require.resolve("./jest.setupTestsAfterEnv")],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  transformIgnorePatterns: ["node_modules/(?!(@ui5|lit-html))"],
  // transform: {
  //   "\\.js$": "babel-jest",
  //   "\\.tsx?$": "ts-jest",
  // },
};
