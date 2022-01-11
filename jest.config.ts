module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*'],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 25,
      lines: 30,
      statements: 30,
    },
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  moduleDirectories: ['node_modules', './'],
  preset: 'ts-jest',
  testRegex: 'test/.*?\\.(test|spec)\\.tsx?$',
};
