
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('students').insert([
        { name: 'IVB', cohort_id: 1 },
        { name: 'Jimmy', cohort_id: 2 },
        { name: 'Timmy', cohort_id: 3 }
      ]);
    });
};

