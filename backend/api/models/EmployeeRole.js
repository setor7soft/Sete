/**
 * EmployeeRole.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'employee_role',
  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      index: true,
      unique: true
    },
    name: 'text',
    employee: {
      collection: 'employee',
      via: 'role_id'
    }
  }
};
