import { RouteConfig } from "./infra/http/RouteConfig";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { DatabaseRepositoryFactory } from "./infra/factories/DatabaseRepositoryFactory ";


const expressAdapter = new ExpressAdapter();
const repositoryFactory = new DatabaseRepositoryFactory()

new RouteConfig(expressAdapter, repositoryFactory);

const port: number =
	(process.env.PORT as unknown as number) || (3000 as number);
expressAdapter.listen(port);
