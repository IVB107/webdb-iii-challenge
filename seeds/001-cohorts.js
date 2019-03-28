
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('cohorts').insert([
        { name: 'WEB17' },
        { name: 'WEB18' },
        { name: 'WEB19' }
      ]);
    });
};
