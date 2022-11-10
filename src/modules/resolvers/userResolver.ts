import "reflect-metadata";
import { Request } from "express";
import { Resolver, Arg, Mutation, Query, Ctx } from "type-graphql";
import { prisma } from "../../database/prismaConnection";
import { User, UserCreate, UserInput, UpdateUserInput } from "../entities/UserSchema";
import { getDataTokenPromise } from "../../utils/decodedPromise";

@Resolver(() => User)
class UserResolver {
	@Query(() => [User])
	async getUsers() {
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
	async getUniqueUser(@Arg("username") username: string) {
		const result = prisma.user.findFirst({
			where: { username: username },
			select: {
				id: true,
				username: true,
				email: true,
				posts: true,
				info: true,
			},
		});

		return result;
	}

	@Mutation(() => UserCreate)
	async createUser(@Arg("createUser") userInput: UserInput) {
		return prisma.user.create({
			data: {
				...userInput,
			},
		});
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
