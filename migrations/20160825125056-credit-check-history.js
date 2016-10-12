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
  db.createTable('credit_check_history', {
      id:
        {
          type: 'uuid',
          primaryKey: true,
          defaultValue: new String('uuid_generate_v1()')
        },
      te_id:
        {
          type: 'BIGINT',
          unique: true,
          foreignKey:
                      {
                        name:'employee_role_history_transaction_entry_id_fk',
                        table: 'transaction_entry',
                        mapping: 'id',
                        rules: {
                                onDelete: 'NO ACTION',
                                onUpdate: 'NO ACTION'
                        }
                      },
          defaultValue: new String('new_te()')
        },
      client_id:
        {
          type: 'uuid',
          foreignKey:
                      {
                        name:'client_credit_check_history_id_fk',
                        table: 'client',
                        mapping: 'id',
                        rules: {
                                onDelete: 'NO ACTION',
                                onUpdate: 'NO ACTION'
                        }
                      }
        },
        user_id:
                {
                  type: 'uuid',
                  foreignKey:
                              {
                                name:'user_credit_check_history_id_fk',
                                table: 'login_user',
                                mapping: 'id',
                                rules: {
                                        onDelete: 'NO ACTION',
                                        onUpdate: 'NO ACTION'
                                }
                              }
                },
      creation_date: 'datetime',
      check_date: 'datetime',
      is_active: 'boolean',
      identifier: 'TEXT',
      status: 'credit_check_status',
      notes: 'text'
    });

  return null;
};

exports.down = function(db) {
  return null;
};
