
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Cohorts', (table) => {
    table.increments(); // Adds 'id' form in table AND sets it as Primary Key

    table
      .string('Name', 128)
      .notNullable()
      .unique();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');

};