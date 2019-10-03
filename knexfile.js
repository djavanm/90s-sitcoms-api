module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/sitcoms',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
