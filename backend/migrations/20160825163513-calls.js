'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createTable('calls', {
    id: {
      type: 'uuid',
      primaryKey: true,
      defaultValue: new String('uuid_generate_v1()')
    },
    te_id: {
      type: 'BIGINT',
      unique: true,
      foreignKey: {
        name: 'employee_role_history_transaction_entry_id_fk',
        table: 'transaction_entry',
        mapping: 'id',
        rules: {
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION'
        }
      },
      defaultValue: new String('new_te()')
    },
    person_id: {
      type: 'uuid',
      foreignKey: {
        name: 'person_calls_id_fk',
        table: 'person',
        mapping: 'id',
        rules: {
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION'
        }
      }
    },
    attendant_id: {
      type: 'uuid',
      foreignKey: {
        name: 'attendant_calls_id_fk',
        table: 'login_user',
        mapping: 'id',
        rules: {
          onDelete: 'NO ACTION',
          onUpdate: 'NO ACTION'
        }
      }
    },
    date: 'datetime',
    description: 'text',
    message: 'text',
    identifier: 'TEXT'
  });
  return null;
};

exports.down = function(db) {
  return null;
};
