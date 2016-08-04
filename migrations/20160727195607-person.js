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
  db.createTable('person', {
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
                      name:'person_transaction_entry_id_fk',
											table: 'transaction_entry',
                      mapping: 'id',
                      rules: {
           										onDelete: 'NO ACTION',
            									onUpdate: 'NO ACTION'
          						}
                    },
        defaultValue: new String('new_te()')
      },
    name: 'TEXT',
    phone_number: 'TEXT',
    mobile_number: 'TEXT',
    fax_number: 'TEXT',
    email: 'TEXT',
    notes: 'TEXT'
  });

};

exports.down = function(db) {
  return null;
};
