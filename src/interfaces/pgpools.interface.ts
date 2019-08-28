import { Pool } from 'pg';
export interface IPgPools {
  [key: string]: Pool;
}
