'use strict';

let _ = require('lodash');
let mongoose = require('mongoose');

const bridge = require('../modules/bridge');

let Schema = mongoose.Schema;

let schemaKey = 'MISSION';

let schema = new Schema(bridge.MissionSchemaRaw, {
  timestamps: true,
  usePushEach: true,
});

/**
 * Indicate whether a worker is an applicant.
 * @param {string} workerId - The object id of the worker.
 * @return {boolean} True if the worker is an applicant, false otherwise.
 */
schema.methods.isApplicant = function (workerId) {
  let id = mongoose.Types.ObjectId(workerId);
  return this.applicants.findIndex((a) => _.isEqual(a, id)) !== -1;
};

/**
 * Indicate whether a worker is hired.
 * @param {string} workerId - The object id of the worker.
 * @return {boolean} True if the worker is hired, false otherwise.
 */
schema.methods.isHired = function (workerId) {
  let id = mongoose.Types.ObjectId(workerId);
  return this.hired.findIndex((h) => _.isEqual(h, id)) !== -1;
};

let model = mongoose.model(schemaKey, schema);

module.exports = model;
