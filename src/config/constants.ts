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
  postgresShutdownContext: 'Postgres DB shutdown',
  paperTrail: { // Do **NOT** use GSWRX papertrail based logging in a DEVELOPMENT setting!
    host: process.env.PAPERTRAIL_HOST,
    port: process.env.PAPERTRAIL_PORT,
    appName: process.env.PAPERTRAIL_APP_NAME,
  },
  // OTHER CONSTANTS
  httpPort: 3000,
  pathToPostgresClients: '../config/postgres-clients.js',
};
