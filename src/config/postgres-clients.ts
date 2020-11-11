const PostgresClients = {
  boilerplateDb: {
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    db: process.env.PSQL_DB,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
  },
};
export default PostgresClients;
