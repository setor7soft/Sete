/**
 * WorkPermitData.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'work_permit_data',
  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      index: true,
      unique: true
    },
    employee: {
      collection: 'employee',
      via: 'work_permit_data_id'
    },

    number: 'text',
    series_number: 'text',
    pis_number: 'text',
    pis_banker: 'text',
    pis_registry_date: 'datetime'

  }
};
