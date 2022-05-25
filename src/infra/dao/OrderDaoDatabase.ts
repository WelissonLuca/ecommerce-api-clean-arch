import { OrderDao } from "../../application/dao/OrderDao";
import { Connection } from "../database/Connection";

export class OrderDaoDatabase implements OrderDao {
	constructor(readonly connection: Connection) {}

	async get(code: string): Promise<{ code: string; total: number }> {
		const [result] = await this.connection.query(
			"select code, total from ccca.order where code = $1",
			[code]
		);
		return result;
	}

	async findAll(): Promise<{ code: string; total: number }[]> {
		return this.connection.query("select code, total from ccca.order", []);
	}
}
