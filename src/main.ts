import { OrderDaoDatabase } from "./infra/dao/OrderDaoDatabase";
import { PgPromiseConnectionAdapter } from "./infra/database/PgPromiseConnectionAdapter";
import { DatabaseRepositoryFactory } from "./infra/factories/DatabaseRepositoryFactory ";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { RouteConfig } from "./infra/http/RouteConfig";

const expressAdapter = new ExpressAdapter();
const repositoryFactory = new DatabaseRepositoryFactory();
const connection = PgPromiseConnectionAdapter.getInstance();
const orderDao = new OrderDaoDatabase(connection);

new RouteConfig(expressAdapter, repositoryFactory, orderDao);

const port: number =
  (process.env.PORT as unknown as number) || (3000 as number);
expressAdapter.listen(port);
