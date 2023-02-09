/** @type {import('ts-jest').JestConfigWithTsJest} */
const jestConfig = require('jest-config');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: [...jestConfig.defaults.moduleFileExtensions, 'mts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    'src/(.*)': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jestSetup.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!@react-dnd|react-dnd|dnd-core|react-dnd-html5-backend)',
  ],
};
