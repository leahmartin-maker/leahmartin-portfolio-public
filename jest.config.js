module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setupTests.js'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
};
