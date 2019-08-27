import { Injectable, LoggerService, Logger } from '@nestjs/common';
import { constants } from '../config/constants';
import { Pool } from 'pg';

@Injectable()
export class PostgresPoolService {

  /** Instance variables */
  public readonly pools: object;
  private readonly logger: Logger;

  /** Constructor */
  constructor() {
    // Define utils
    this.logger = new Logger();
    this.pools = {};
    // Set up connections to the pools on initialization of service
    this.bootstrap();
  }

  /**
   * Set up connections to the predefined clients by means of
   * node postgreSQL pools.
   */
  private bootstrap(): void {
    // Set up database connections
    try {
      const clients = require(constants.pathToPostgresClients).default;
      const clientKeys = Object.keys(clients);
      this.logger.log(`Found ${clientKeys.length} client(s) in configuration.`, constants.postgresBootstrapContext);
      for (const clientName of clientKeys) {
        this.logger.log(`Setting up client pool for '${clientName}' client.`, constants.postgresBootstrapContext);
        const pool = new Pool({
          connectionString: clients[clientName],
        });
        this.logger.log(`Connecting to '${clientName}' pool.`, constants.postgresBootstrapContext);
        try {
          pool.connect().then(() => {
            this.logger.log(`Connected to '${clientName}' pool - it is now available.`, constants.postgresBootstrapContext);
            this.pools[clientName] = pool;
          });
        } catch (e) {
          this.logger.error(`Error connecting to '${clientName}' pool: ${e}.`, constants.postgresBootstrapContext);
        }
      }
    } catch (e) {
      this.logger.error(`Error with PostgreSQL client config at ${constants.pathToPostgresClients}.`, constants.postgresBootstrapContext);
    }
  }

}
