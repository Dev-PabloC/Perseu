import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./modules/users/userResolver";
import { PostResolver } from "./modules/posts/postResolver";
import { LoginResolver } from "./modules/auth/loginResolver";
import { InfoResolver } from "./modules/info/infoResolver";

async function ServerStart() {
	const schema = await buildSchema({
		resolvers: [UserResolver, PostResolver, LoginResolver, InfoResolver],
	});
	const server = new ApolloServer({
		schema,
		context: ({ req, res }: any) => ({ req, res }),
	});

	const { url } = (await server.listen(3000)) as { url: string };

	console.log(`${url}`);
}

ServerStart();
