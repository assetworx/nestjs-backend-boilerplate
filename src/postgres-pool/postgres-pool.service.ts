import { Injectable, LoggerService, Logger, OnApplicationShutdown } from '@nestjs/common';
import { constants } from '../config/constants';
import { Pool } from 'pg';
import { IPgPools } from '../interfaces/pgpools.interface';
import { AppLoggerService } from '../logger/logger.service';

@Injectable()
export class PostgresPoolService implements OnApplicationShutdown {

  /** Instance variables */
  public readonly pools: IPgPools;

  /** Constructor */
  constructor(public logger: AppLoggerService) {
    // Define utils
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

  /** Close pools on application shutdown */
  onApplicationShutdown(signal: string): void {
    this.logger.warn(`Application shutdown signal observed in PostgreSQL Pool Service: ${signal}`, constants.postgresShutdownContext);
    this.logger.warn(`Shutting down PostgreSQL pools`, constants.postgresShutdownContext);
    if (this.pools && this.pools.length > 0) {
      Object.keys(this.pools).forEach(pool => {
        try {
          this.pools[pool].end();
          this.logger.log(`Successfully shutdown pool ${pool}.`, constants.postgresShutdownContext);
        } catch (e) {
          this.logger.error(`Error when closing pool ${pool}. Manually check shutdown! Error: ${e}`, constants.postgresShutdownContext);
        }
      });
    } else {
      this.logger.log('No PostgreSQL pools active, shutdown complete.', constants.postgresShutdownContext);
    }
  }

}
