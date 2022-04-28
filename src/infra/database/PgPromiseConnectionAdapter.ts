import 'dotenv/config';

import { Connection } from "./Connection";
import { IClient } from "pg-promise/typescript/pg-subset";
import pgp from 'pg-promise';
export class PgPromiseConnectionAdapter implements Connection {
	static instance: PgPromiseConnectionAdapter;
	pgp: IClient;
	private constructor() {
		this.pgp = pgp()({
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			port: process.env.DB_PORT as unknown as number,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		});
	}

	static getInstance(): PgPromiseConnectionAdapter { 
		if (!PgPromiseConnectionAdapter.instance) {
			PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter();
		}
		return PgPromiseConnectionAdapter.instance;
	}

	query(statment: string, params: any[]): Promise<any> {
		return this.pgp.query(statment, params);
	}
}