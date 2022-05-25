import { Connection } from '../../../infra/database/Connection';
import { GetOrderOutput } from './GetOrderOutput';
export class GetOrder {
  constructor(readonly connection: Connection) {

  }

  async execute(code: string): Promise<GetOrderOutput> { 
    const [ordarData] = await this.connection.query("select code, total::float from ccca.order where code = $1", [code]);
    const getOrderOutput = new GetOrderOutput(ordarData.code, ordarData.total);
    return getOrderOutput;
  }
}