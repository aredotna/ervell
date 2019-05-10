module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
  },
  testURL: 'http://localhost/',
  setupTestFrameworkScriptFile: 'jest-enzyme',
  testEnvironment: 'enzyme',
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
  modulePaths: ['/src', '/node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    'v2/(.*)': '<rootDir>/src/v2/$1',
  },
}
