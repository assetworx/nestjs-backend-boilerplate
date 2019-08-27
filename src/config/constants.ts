export const constants = {
  // JWT CONSTANTS
  secret: 'secretKey',
  jwtDefaultExpiration: '2 days',
  // SECURITY CONSTANTS
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  rateLimitMaxReqPerWindow: 300,
  // LOGGER CONTEXTS
  loggerBootstrapContext: 'GlobalBootstrap',
  postgresBootstrapContext: 'Postgres DB init',
  // OTHER CONSTANTS
  httpPort: 3000,
  pathToPostgresClients: '../config/postgres-clients.ts',
};
