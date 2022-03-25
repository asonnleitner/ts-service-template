import { InitialOptionsTsJest } from 'ts-jest'

const jestConfig: InitialOptionsTsJest = {
  rootDir: __dirname,
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: {
        target: 'esnext',
        sourceMap: true
      }
    }
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: ['src/**/*.{ts}'],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^~/(.*?)$': '<rootDir>/src/$1'
  }
}

export default jestConfig
