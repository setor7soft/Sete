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
  db.createTable('voter_data', {
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
                          name:'voter_data_transaction_entry_id_fk',
                          table: 'transaction_entry',
                          mapping: 'id',
                          rules: {
                                  onDelete: 'NO ACTION',
                                  onUpdate: 'NO ACTION'
                          }
                        },
            defaultValue: new String('new_te()')
          },
        number: 'text',
        section: 'text',
        zone: 'text'
      });
  return null;
};

exports.down = function(db) {
  return null;
};
