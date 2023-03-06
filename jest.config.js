const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    modulePaths: [compilerOptions.baseUrl],
    setupFiles: ['dotenv/config'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
};
