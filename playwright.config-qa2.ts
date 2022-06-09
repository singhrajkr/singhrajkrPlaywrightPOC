import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  // Path to the global setup file. This file will be required and run before all the tests. It must export a single function.
  //globalSetup: './global/global-setup',

  // Path to the global teardown file. This file will be required and run after all the tests. It must export a single function.
  //globalTeardown: './global/global-teardown',

  // Directory with the test files.
  testDir: './regression-suite',

  // Glob patterns or regular expressions that should be ignored when looking for the test files. For example, '**/test-assets'.
  //testIgnore: '**/test-assets',

  /* Maximum time one test can run for. */
  timeout: 30 * 1000,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Whether to exit with an error if any tests are marked as test.only. Useful on CI. 
  Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [ ['line'], ['allure-playwright', { outputFolder: 'allure-results' }], ['html'] ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /*Use - Configure projects for major browsers for paralle else mentioned 
    Name of the browser that will run the tests, one of chromium, firefox, or webkit */
    // browserName: 'chromium',

    //Whether to run the browser in headless mode.
    // headless: false,

    //Viewport used for all pages in the context.
    // viewport: { width: 1280, height: 720 },

    // ignoreHTTPSErrors: true,

    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,

    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',

    screenshot: 'on',

    video: 'on',

    locale: 'en-EN',
    geolocation: { longitude: 48.858455, latitude: 2.294474 },
    permissions: ['geolocation'],
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Regression Test Suite',
      testIgnore: /.*bla-bla.spec.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
