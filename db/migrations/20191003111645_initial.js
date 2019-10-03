exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('sitcoms', table => {
      table.increments('id').primary();
      table.string('title');
      table.integer('seasons').unsigned();
      table.integer('episodes').unsigned();
      table.string('premiere_date');
      table.string('finale_date');
      table.timestamps(true, true)
    }),
    knex.schema.createTable('cast_members', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('character');
      table.boolean('original');
      table.integer('sitcom_id').unsigned();
      table.foreign('sitcom_id')
        .references('sitcoms.id');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
   knex.schema.dropTable('cast_members'),
   knex.schema.dropTable('sitcoms')
 ]);
};
