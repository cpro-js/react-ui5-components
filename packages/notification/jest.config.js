/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: "node",
  snapshotResolver: require.resolve("./.jest/snapshotResolver"),
  setupFiles: [require.resolve("./.jest/setupTestsAfterEnv")],
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
