import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.next/'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
};

export default createJestConfig(config);
