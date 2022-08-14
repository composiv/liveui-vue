module.exports = {
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: ['src/*.js', 'src/**/*.js', '!src/**/*.test.js'],
  coverageReporters: ['json', 'text', 'lcov'],
  moduleDirectories: ['node_modules', 'src'],
  testRegex: 'tests/.*\\.test\\.js$',
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@eclipse-muto/liveui-core)'],
};
