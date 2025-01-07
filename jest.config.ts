import { getJestProjectsAsync } from '@nx/jest';

export default async () => ({
  projects: await getJestProjectsAsync(),
});

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: './reports/junit', outputName: 'junit.xml' }],
    ['jest-html-reporters', { publicPath: './reports/html', filename: 'report.html' }]
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};

