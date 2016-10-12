/**
 * LoginUser.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  tableName: 'login_user',

  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      index: true,
      unique: true
    },
    username: 'text',
    pw_hash: 'text',
    is_active: 'boolean',
    person_id : {
      model: 'Person',
      unique: true
    },
    //profile_id : {
    //  model: 'UserProfile',
    //  unique: true
    //},
    credit_check_history_id: {
      collection: 'creditCheckHistory',
      via: 'user_id'
    }
  }
};
