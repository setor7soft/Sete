/**
 * EmployeeRoleHistory.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'employee_role_history',

  attributes: {

    id: {
          type: 'string',
          primaryKey: true,
          index: true,
          unique: true
        },
    began: 'datetime',
    ended: 'datetime',
    salary: 'float',

    role_id: {
      model: 'employeeRole',
      unique: true
    },

    employee_id: {
      model: 'employee',
      unique: true
    }


  }
};

