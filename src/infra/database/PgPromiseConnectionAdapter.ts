import 'dotenv/config';

import { Connection } from "./Connection";
import { IClient } from "pg-promise/typescript/pg-subset";
import pgp from 'pg-promise';
export class PgPromiseConnectionAdapter implements Connection {
	
	pgp: IClient;
	constructor() {
		this.pgp = pgp()({
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			port: process.env.DB_PORT as unknown as number,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		});
	}

	query(statment: string, params: any[]): Promise<any> {
		return this.pgp.query(statment, params);
	}
}