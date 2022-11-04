import "reflect-metadata";
import { Request } from "express";
import { Resolver, Field, Arg, Mutation, InputType, Query, Ctx, createMethodDecorator } from "type-graphql";
import { prisma } from "../../database/prismaConnection";
import { Post } from "./PostSchema";
import { verify } from "jsonwebtoken";

@InputType()
class PostInput {
	@Field()
	title: string;

	@Field()
	content: string;
}

@Resolver()
export class PostResolver {
	@Query(() => [Post])
	async getAllPosts() {
		const result = await prisma.post.findMany({
			select: {
				id: true,
				title: true,
				content: true,
				userId: true,
			},
		});

		return result;
	}
	@Query(() => Post)
	async getUniquePost(@Arg("title") Title: string) {
		return prisma.post.findFirst({ where: { title: Title } });
	}

	@Mutation(() => Post)
	async createPost(@Arg("createPost") postInput: PostInput, @Ctx("req") req: Request) {
		const authToken = req.headers.authorization;
		const token = authToken?.slice(7);

		if (!token) {
			return "No authorized";
		}

		const { userId, email } = verify(String(token), String(process.env.JWTKEY)) as {
			userId: string;
			email: string;
		};

		const result = await prisma.user.update({
			where: { id: userId },
			data: {
				posts: {
					create: {
						title: postInput.title,
						content: postInput.content,
					},
				},
			},
		});

		return result;
	}

	@Mutation(() => Post)
	async updatePost(@Arg("updatePost") postInput: PostInput, @Ctx() req: Request, @Arg("id") id: string) {
		const authToken = req.headers.authorization;
		const token = authToken?.slice(7);

		if (!token) {
			return "No authorized";
		}

		const { userId, email } = verify(String(token), String(process.env.JWTKEY)) as {
			userId: string;
			email: string;
		};

		const result = await prisma.post.findFirst({ where: { userId: userId } });

		if (result?.title === postInput.title) {
			const result = await prisma.post.update({
				where: {
					id: id,
				},
				data: { ...postInput },
			});

			return result;
		}
	}
	@Mutation(() => Post)
	async deletePost(@Arg("id") id: string, @Ctx() req: Request) {
		const authToken = req.headers.authorization;
		const token = authToken?.slice(7);

		if (!token) {
			return "No authorized";
		}

		const { userId, email } = verify(String(token), String(process.env.JWTKEY)) as {
			userId: string;
			email: string;
		};

		const result = await prisma.post.findFirst({ where: { id: id } });

		if (result?.userId !== userId) {
			return "No authorized";
		}

		if (result?.userId === userId) {
			return prisma.post.delete({ where: { id: id } });
		}
	}
}
