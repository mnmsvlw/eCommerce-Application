import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  roots: ['<rootDir>/test'],
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/test/**/*.test.ts'],
  moduleNameMapper: {
    '\\.(css|less)$': 'jest-css-modules-transform',
  },
};

export default jestConfig;
