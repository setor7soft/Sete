/**
 * Calls.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      index: true,
      unique: true
    },
    date: 'datetime',
    description: 'text',
    message: 'text',
    identifier: 'TEXT',
    person_id: {
      model: 'Person',
      unique: true
    },
    attendant_id: {
      model: 'LoginUser',
      unique: true
    }
  }
};
