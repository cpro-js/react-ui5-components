// place snap files next to the test, see https://stackoverflow.com/a/68445363
module.exports = {
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath + snapshotExtension,
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath.replace(snapshotExtension, ""),
  testPathForConsistencyCheck: "some.test.js",
};
