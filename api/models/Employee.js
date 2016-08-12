/**
 * Employee.js
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
    status: {
      type: 'string',
      enum: ['normal', 'away', 'vacation', 'off']
    },
    salary: {
      type: 'float',
      defaultsTo: 0
    },
    admission_date: 'datetime',
    expire_vacation: 'datetime',
    registry_number: 'text',
    education_level: 'text',
    dependent_person_number: 'integer',
    is_active: 'boolean',
    person_id: {
      model: 'person',
      unique: true
    },

    role_id: {
      model: 'employeeRole',
      unique: true
    },
    employee_role_history: {
      collection: 'employeeRoleHistory',
      via: 'employee_id'
    },

    work_permit_data_id: {
          model: 'workPermitData',
          unique: true
        },
    voter_data_id: {
          model: 'voterData',
          unique: true
        },
    military_data_id: {
      model: 'militaryData',
      unique: true
    }


  }
};

