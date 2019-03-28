
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Students', (table) => {
    table.increments();

    table
      .string('Name')
      .notNullable()
      .unique()

    table
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('Cohorts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Students');
};
