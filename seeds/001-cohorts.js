
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries *truncate deletes are records as well as resets the ids
  return knex('cohorts')
    .truncate() 
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'Web 18'},
        {name: 'Web 19'},
        {name: 'Web 20'}
      ]);
    });
};
