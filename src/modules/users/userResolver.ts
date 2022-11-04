import "reflect-metadata";
import { Request } from "express";
import { Resolver, Field, Arg, Mutation, InputType, Query, Ctx } from "type-graphql";
import { prisma } from "../../database/prismaConnection";
import { User, UserCreate } from "./UserSchema";
import { verify } from "jsonwebtoken";
import { Info } from "../info/infoSchema";
import { Post } from "../posts/PostSchema";

@InputType()
class UserInput {
	@Field()
	username: string;

	@Field()
	email: string;

	@Field()
	password: string;
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
	async getUniqueUser(@Arg("username") name: string) {
		const result = prisma.user
			.findFirst({
				where: { username: name },
			})
			.posts();

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
	async updateUser(@Arg("updateUser") userInput: UserInput, @Ctx("req") req: Request) {
		const authToken = req.headers["authorization"];
		const token = authToken?.slice(7);

		if (!token) {
			return "No authorized";
		}

		const { userId, email } = verify(String(token), String(process.env.JWTKEY)) as { userId: string; email: string };
		return prisma.user.update({ where: { id: userId }, data: { ...userInput } });
	}

	@Mutation(() => User)
	async deleteUser(@Arg("email") emailInput: string, @Ctx("req") req: Request) {
		const authToken = req.headers["authorization"];
		const token = authToken?.slice(7);

		if (!token) {
			return "No authorized";
		}

		const { userId, email } = verify(String(token), String(process.env.JWTKEY)) as { userId: string; email: string };

		if (emailInput !== email) {
			return "No authorized";
		}

		if (emailInput === email) {
			return prisma.user.delete({ where: { id: userId } });
		}
	}
}

export { UserResolver };
