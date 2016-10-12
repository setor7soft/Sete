/**
 * CreditCheckHistory.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'credit_check_history',

  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      index: true,
      unique: true
    },
    creation_date: 'datetime',
    check_date: 'datetime',
    is_active: 'boolean',
    identifier: 'TEXT',
    status: {
      type: 'string',
      enum: ['Included', 'not-included']
    },
    notes: 'text',
    user_id: {
      model: 'LoginUser',
      unique: true
    } //,
    //client_id: {
    //  model: 'Client',
    //  unique: true
    //}
  }
};
