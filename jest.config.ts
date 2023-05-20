import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    globalSetup: './scripts/setup.ts',
    globalTeardown: './scripts/teardown.ts',
    extensionsToTreatAsEsm: ['.ts'],
    moduleFileExtensions: ['ts', 'js'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 15000,
    transform: {}
};

export default config;