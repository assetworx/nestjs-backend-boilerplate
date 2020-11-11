import { Injectable, LoggerService, Logger, OnApplicationShutdown } from '@nestjs/common';
import { constants } from '../config/constants';
import { Pool } from 'pg';
import { IPgPools } from '../interfaces/pgpools.interface';
import { AppLoggerService } from '../logger/logger.service';
import * as fs from 'fs';

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
          user: clients[clientName].user,
          host: clients[clientName].host,
          database: clients[clientName].db,
          password: clients[clientName].password,
          port: clients[clientName].port,
          ssl: {
            rejectUnauthorized: true,
            ca: fs.readFileSync('/usr/src/app/dist/db.crt').toString(), // Change into filepath of your CRT file.
          },
        });
        this.logger.log(`Connecting to '${clientName}' pool.`, constants.postgresBootstrapContext);
        try {

          // Register pool
          this.pools[clientName] = pool;
          this.logger.log(`Set up the '${clientName}' pool - testing connection...`, constants.postgresBootstrapContext);

          // Test the connection
          pool.connect().then((client) => {

            // Check if an error has been reported.
            if (!client) {
              this.logger.error(`Error on connecting to '${clientName}' pool: no client.`, constants.postgresBootstrapContext);
              return false;
            }

            // No error: do a select for the current database
            return client.query('SELECT current_database() AS connected_to_db;')
                    .then((res) => {
                      this.logger.log(`Success on '${clientName}' pool connection test - connected to ${
                          res.rows && res.rows[0] ? res.rows[0].connected_to_db : ''}.`, constants.postgresBootstrapContext);
                      client.release();
                    })
                    .catch((err) => {
                      this.logger.error(`Error on connecting to '${clientName}' pool: '${err}'.`, constants.postgresBootstrapContext);
                      client.release();
                    });

          });

        } catch (e) {
          this.logger.error(`Error connecting to '${clientName}' pool: ${e}.`, constants.postgresBootstrapContext);
        }
      }
    } catch (e) {
      this.logger.error(`Error with PostgreSQL client config at ${constants.pathToPostgresClients}.`, constants.postgresBootstrapContext);
      this.logger.error(e, constants.postgresBootstrapContext);
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
