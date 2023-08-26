import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(css|less)$': 'jest-css-modules-transform',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/types/*.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

export default jestConfig;
