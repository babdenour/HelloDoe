'use strict';

let mongoose = require('mongoose');

const bridge = require('../modules/bridge');

let Schema = mongoose.Schema;

let schemaKey = 'CLIENT';

let schema = new Schema(bridge.ClientSchemaRaw, {
  timestamps: true,
  usePushEach: true,
});

/*
  Set the client attributes
  ARGS:
    data: (object)
      companyName: (string)
      address: (string)
      contact: (object)
        firstName: (string)
        lastName: (string)
        phone: (string)
        email: (string)

  RETURN:
    (object) the model instance
*/
schema.methods.setClientInfos = function (data) {
  this.companyName = data.companyName;
  this.address = data.address;
  this.siren = data.siren;
  this.contact.firstName = data.contact.firstName;
  this.contact.lastName = data.contact.lastName;
  this.contact.phone = data.contact.phone;
  this.contact.email = data.contact.email;
  return this;
};

let model = mongoose.model(schemaKey, schema);

module.exports = model;
