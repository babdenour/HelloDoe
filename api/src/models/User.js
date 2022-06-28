'use strict';

let mongoose = require('mongoose');

const UserRoles = require('../enums').UserRoles;

let Schema = mongoose.Schema;

let schemaKey = 'User';

let schema = new Schema(
  {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    username: { type: String },
    password: { type: String },
    role: { type: String },
  },
  {
    usePushEach: true,
  },
);

schema.methods.isAdmin = function () {
  return this.role === UserRoles.ADMIN;
};

let model = mongoose.model(schemaKey, schema);

module.exports = model;
