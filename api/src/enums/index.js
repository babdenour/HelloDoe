'use strict';

let Attributes = require('./attributes');
let AvailabilitiesHours = require('./availabilitiesHours');
let AvailabilitiyType = require('./availabilityType');
let Deadlines = require('./deadlines');
let ErrorKeys = require('./ErrorKeys');
let Genders = require('./genders');
let MissionCategories = require('./missionCategories');
let MissionStatus = require('./MissionStatus');
let OfferType = require('./offerType');
let UserRoles = require('./userRoles');

let enums = {
  Attributes,
  AvailabilitiesHours,
  AvailabilitiyType,
  Deadlines,
  ErrorKeys,
  Genders,
  MissionCategories,
  MissionStatus,
  OfferType,
  UserRoles,
};

module.exports = enums;
