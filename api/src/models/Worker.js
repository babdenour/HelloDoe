'use strict';

const mongoose = require('mongoose');

const nt = require('../utils/nativeTypes');
const loggerPrefix = 'MDL Worker' + ' > ';
const Attributes = require('../enums').Attributes;
const AvailabilitiyType = require('../enums').AvailabilitiyType;
const Genders = require('../enums').Genders;
const UserRoles = require('../enums').UserRoles;
const bridge = require('../modules/bridge');

let Schema = mongoose.Schema;

let schemaKey = 'WORKER';

let schema = new Schema(bridge.DoerSchemaRaw, {
  timestamps: true,
  usePushEach: true,
});

/*
  Get the updatable fields.
  @params {object} worker - Object with a worker structure.
  @params {string} userRole - Role of the user.
  @return {object} Object with updatable fields, null if some fields are invalid.
*/
schema.statics.getUpdatableFields = function (worker, userRole) {
  let workerCopy = Object.assign({}, worker);
  let updatableFields = {};

  if (userRole === UserRoles.WORKER) {
    updatableFields.workProfile = {};
    updatableFields.workProfile.siret = nt.getProp(workerCopy, 'workProfile.siret');
    updatableFields.workProfile.availabilities = nt.getProp(workerCopy, 'workProfile.availabilities');
    updatableFields.workProfile.location = nt.getProp(workerCopy, 'workProfile.location');
  } else if (userRole === UserRoles.ADMIN) {
    updatableFields = workerCopy;
  }

  return updatableFields;
};

schema.methods.getAvailabilities = function () {
  return {
    type: this.workProfile.availabilities.type,
    deadline: this.workProfile.availabilities.deadline,
    timeSlots: this.workProfile.availabilities.timeSlots,
  };
};

schema.methods.getLocation = function () {
  if (nt.isUndefined(this.workProfile.location)) var location = [];
  else location = this.workProfile.location;
  return location;
};

schema.methods.setAvailabilities = function (type, deadline, timeSlots) {
  if (!nt.isUndefined(type)) this.workProfile.availabilities.type = type;
  if (!nt.isUndefined(deadline)) this.workProfile.availabilities.deadline = deadline;
  if (!nt.isUndefined(timeSlots)) this.workProfile.availabilities.timeSlots = timeSlots;
  return this;
};

schema.methods.setDeadline = function (deadline) {
  this.workProfile.availabilities.deadline = deadline;
  return this;
};

schema.methods.setAttribute = function (attributeId, rawValue) {
  if (attributeId === Attributes.FIRST_NAME) {
    this.profile.first_name = rawValue;
  } else if (attributeId === Attributes.LAST_NAME) {
    this.profile.last_name = rawValue;
  } else if (attributeId === Attributes.EMAIL) {
    this.profile.email = rawValue;
  } else if (attributeId === Attributes.SIRET) {
    this.workProfile.siret = rawValue;
  } else if (attributeId === Attributes.PHONE) {
    this.profile.phone = rawValue;
  } else if (attributeId === Attributes.GENDER) {
    let gender = Genders[rawValue];
    if (nt.isUndefined(gender)) throw new Error(loggerPrefix + `invalid "gender" raw value: "${rawValue}"`);
    else this.profile.gender = gender;
  } else if (attributeId === Attributes.BIRTHDAY) {
    this.profile.birthday = rawValue;
  } else if (attributeId === Attributes.CITY) {
    this.profile.city = rawValue;
  } else if (attributeId === Attributes.COUNTRY) {
    this.profile.country = rawValue;
  } else if (attributeId === Attributes.NATIONALITY) {
    this.profile.nationality = rawValue;
  } else if (attributeId === Attributes.RESIDENCE_PERMIT_OK) {
    this.profile.residencePermitOk = rawValue === 'true';
  } else if (attributeId === Attributes.DEPARTMENT) {
    this.profile.department = rawValue;
  } else if (attributeId === Attributes.ADDRESS) {
    this.profile.address = rawValue;
  }

  return this;
};

schema.methods.setLocation = function (location) {
  if (!nt.isUndefined(location)) this.workProfile.location = location;
  return this;
};

/* Test the compatibility of the worker with a timtetable
  ARGS:
    timtetable: (object)
      dates: (array) dates in YYYY-MM-DD
      days: (array) id of the dates' days

  RETURN:
    (boolean) true is compatible, false otherwise
*/
schema.methods.isTimetableCompatible = function (timetable) {
  if (this.workProfile.availabilities.type === AvailabilitiyType.REGULAR) {
    let workerDays = new Set(this.workProfile.availabilities.timeSlots.map((ts) => ts.day));
    return timetable.days.every((day) => workerDays.has(day));
  } else if (this.workProfile.availabilities.type === AvailabilitiyType.FLEXIBLE) {
    return timetable.dates.every((date) => this.workProfile.availabilities.timeSlots.includes(date));
  }
};

/**
 * Indicate if the Doer needs to complete the freelance process.
 * @return {boolean} True if needs to, false otherwise.
 */
schema.methods.doesNeedToCompleteFreelanceProcess = function () {
  const { siret, hasCompletedFreelanceProcess } = this.workProfile;
  return !hasCompletedFreelanceProcess && nt.isBlank(siret);
};

/**
 * Filter the workers.
 * @return {Promise} Resolves with the list of the missions, rejects with an error.
 */
schema.statics.filterWorkers = async function (sort, page = 0, pageSize = 15) {
  // Filter out Doers that dont have completed their profile
  const queryCount = this.find({}).where('profile.first_name').ne(undefined);
  let queryDocs = this.find({}).where('profile.first_name').ne(undefined);

  if (sort !== undefined) {
    queryDocs = queryDocs.sort(sort);
  }

  queryDocs = queryDocs.skip(page * pageSize).limit(pageSize);

  const [allDocs, filteredDocs] = await Promise.all([queryCount.exec(), queryDocs.exec()]);

  const response = {
    docs: filteredDocs,
    pages: Math.ceil(allDocs.length / pageSize),
  };

  return response;
};

const model = mongoose.model(schemaKey, schema);

module.exports = model;
