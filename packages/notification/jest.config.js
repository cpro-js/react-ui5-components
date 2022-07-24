/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  displayName: require("./package.json").name,
  testEnvironment: "jest-environment-jsdom",
  snapshotResolver: require.resolve("./.jest/snapshotResolver"),
  setupFilesAfterEnv: [require.resolve("./.jest/setupTestsAfterEnv")],
  transformIgnorePatterns: ["node_modules/(?!(@ui5|@react-hook|lit-html))"],
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        sourceMaps: true,
        jsc: {
          parser: {
            syntax: "typescript",
            tsx: true,
            decorators: true,
            dynamicImport: false,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
  },
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
};
