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
  db.createTable('employee', {
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
                      name:'employee_transaction_entry_id_fk',
                      table: 'transaction_entry',
                      mapping: 'id',
                      rules: {
                              onDelete: 'NO ACTION',
                              onUpdate: 'NO ACTION'
                      }
                    },
        defaultValue: new String('new_te()')
      },
    person_id:
      {
        type: 'uuid',
        foreignKey:
                    {
                      name:'employee_person_id_fk',
                      table: 'person',
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
                      name:'employee_employee_role_id_fk',
                      table: 'employee_role',
                      mapping: 'id',
                      rules: {
                              onDelete: 'NO ACTION',
                              onUpdate: 'NO ACTION'
                      }
                    }
     },

    status: 'employee_status',
    salary: {
              type: 'numeric(20,2)',
              defaultValues: 0
            },
    admission_date: 'datetime',
    expire_vacation: 'datetime',
    registry_number: 'TEXT',
    education_level: 'TEXT',
    dependent_person_number: 'integer',
    is_active: 'boolean'
  });
  return null
};

exports.down = function(db) {
  return null;
};
