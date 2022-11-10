import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { resolvers } from "./modules/resolvers/resolver";

async function ServerStart() {
	const schema = await buildSchema({ resolvers });
	const server = new ApolloServer({
		schema,
		context: ({ req, res }: any) => ({ req, res }),
	});

	const { url } = (await server.listen(4000)) as { url: string };

	console.log(`${url}`);
}

ServerStart();
