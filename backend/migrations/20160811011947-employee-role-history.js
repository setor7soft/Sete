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
  db.createTable('employee_role_history', {
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
      employee_id:
        {
          type: 'uuid',
          foreignKey:
                      {
                        name:'employee_employee_role_id_fk',
                        table: 'employee',
                        mapping: 'id',
                        rules: {
                                onDelete: 'NO ACTION',
                                onUpdate: 'NO ACTION'
                        }
                      }
        },
        role_id:
                {
                  type: 'uuid',
                  foreignKey:
                              {
                                name:'employee_employee_role_history_id_fk',
                                table: 'employee_role_history',
                                mapping: 'id',
                                rules: {
                                        onDelete: 'NO ACTION',
                                        onUpdate: 'NO ACTION'
                                }
                              }
                },
      salary: {
                type: 'numeric(20,2)',
                defaultValues: 0
              },
      began: 'datetime',
      ended: 'datetime',
      is_active: 'boolean'
    });
  return null;
};

exports.down = function(db) {
  return null;
};
