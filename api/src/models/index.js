'use strict'

const system = require('../utils/system')

let models = system.loadModulesFromFolder(__dirname, ['index.js'])

module.exports = models
