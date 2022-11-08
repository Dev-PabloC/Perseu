import "reflect-metadata";
import { Request } from "express";
import { Resolver, Field, Arg, Mutation, InputType, Query, Ctx } from "type-graphql";
import { prisma } from "../../database/prismaConnection";
import { User, UserCreate } from "./UserSchema";
import { getDataTokenPromise } from "../../utils/decodedPromise";

@InputType()
class UserInput {
	@Field()
	username: string;

	@Field()
	email: string;

	@Field()
	password: string;
}

@InputType()
class UpdateUserInput {
	@Field({ nullable: true })
	username?: string;

	@Field({ nullable: true })
	email?: string;

	@Field({ nullable: true })
	password?: string;
}

@Resolver(() => User)
class UserResolver {
	@Query(() => [User])
	async getAllUsers() {
		const result = await prisma.user.findMany({
			select: {
				email: true,
				username: true,
				password: false,
				admin: true,
				id: true,
				info: true,
				posts: true,
			},
		});

		return result;
	}

	@Query(() => User)
	async getUniqueUser(@Arg("name") name: string) {
		const result = prisma.user.findFirst({
			where: { username: name },
			include: {
				info: true,
				posts: true,
			},
		});

		return result;
	}

	@Mutation(() => UserCreate)
	async createUser(@Arg("createUser") userInput: UserInput): Promise<string | null> {
		await prisma.user.create({
			data: {
				...userInput,
			},
		});

		return "User created";
	}

	@Mutation(() => User)
	async updateUser(@Arg("updateUser") updateUser: UpdateUserInput, @Ctx("req") req: Request): Promise<string | null> {
		const token = req.headers["authorization"]?.slice(7);

		if (!token) {
			return "No authorized";
		}

		const { userId } = (await getDataTokenPromise(String(token))) as { userId: string };
		await prisma.user.update({ where: { id: userId }, data: { ...updateUser } });
		return "User updated";
	}

	@Mutation(() => User)
	async deleteUser(@Arg("email") emailInput: string, @Ctx("req") req: Request): Promise<string | null> {
		const token = req.headers["authorization"]?.slice(7);

		if (!token) {
			return "No authorized";
		}

		const { userId, email } = (await getDataTokenPromise(String(token))) as { userId: string; email: string };

		if (emailInput === email) {
			await prisma.user.delete({ where: { id: userId } });
			return "User deleted";
		}

		return "No authorized";
	}
}

export { UserResolver };
