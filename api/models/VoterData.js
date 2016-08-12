/**
 * VoterData.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'voter_date',
  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      index: true,
      unique: true
    },
    employee: {
      collection: 'employee',
      via: 'voter_data_id'
    },
    number: 'text',
    section: 'text',
    zone: 'text'

  }
};

