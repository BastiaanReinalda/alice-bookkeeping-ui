// setup from https://jestjs.io/docs/en/puppeteer
/* eslint no-useless-constructor: "off" */

const chalk = require('chalk');
const NodeEnvironment = require('jest-environment-node'); // eslint-disable-line import/no-extraneous-dependencies
const puppeteer = require('puppeteer');
const fs = require('fs');
const os = require('os');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log(chalk.yellow('Setup Test Environment.'));
    await super.setup();
    const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }
    this.global.BROWSER = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });
    this.global.TIME_OUT = 5000;
    if (process.env.TEST_URL) {
      this.global.TEST_URL = process.env.TEST_URL;
    } else {
      this.global.TEST_URL = 'http://jiskefet.heikovdheyden.nl/';
    }
  }

  async teardown() {
    console.log(chalk.yellow('Teardown Test Environment.'));
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = PuppeteerEnvironment;