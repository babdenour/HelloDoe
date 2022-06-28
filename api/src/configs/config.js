'use strict';

const fs = require('fs');
const path = require('path');
let devConfig = {};

const pathToModule = path.join(__dirname, 'dev.config.js');
if (fs.existsSync(pathToModule)) devConfig = require(pathToModule);

const structConfig = require('./struct.config');

const config = {};
Object.keys(structConfig).forEach((key) => {
  config[key] = process.env[key] || devConfig[key] || structConfig[key];
});

module.exports = config;
