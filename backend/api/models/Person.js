/**
 * Person.js
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
    name: {
      type: 'text'
    },
    //TODO Valida somente numeros
    phone_number: {
      type: 'text'
    },
    //TODO Valida somente numeros
    mobile_number: {
      type: 'text'
    },
    //TODO Valida somente numeros
    fax_number: {
      type: 'text'
    },
    email: {
      type: 'text',
      defaultsTo: ''
    },
    notes: {
      type: 'text',
      defaultsTo: ''
    },
    employee_id: {
      collection: 'employee',
      via: 'person_id'
    }

  }
};
