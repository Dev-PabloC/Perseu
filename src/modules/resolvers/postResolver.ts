import "reflect-metadata";
import { Request } from "express";
import { Resolver, Arg, Mutation, Query, Ctx } from "type-graphql";
import { prisma } from "../../database/prismaConnection";
import { Post, PostInput } from "../entities/PostSchema";
import { getDataTokenPromise } from "../../utils/decodedPromise";

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
	async createPost(@Arg("createPost") postInput: PostInput, @Ctx("req") req: Request): Promise<string | null> {
		const token = req.headers["authorization"]?.slice(7);

		if (!token) {
			return "No authorized";
		}

		const { userId } = (await getDataTokenPromise(String(token))) as {
			userId: string;
		};

		await prisma.user.update({
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

		return "Post created";
	}

	@Mutation(() => Post)
	async updatePost(
		@Arg("updatePost") postInput: PostInput,
		@Ctx() req: Request,
		@Arg("id") id: string,
	): Promise<string | void> {
		const token = req.headers["authorization"]?.slice(7);

		if (!token) {
			return "No authorized";
		}

		const { userId } = (await getDataTokenPromise(String(token))) as {
			userId: string;
		};

		const result = await prisma.post.findFirst({ where: { userId: userId } });

		if (result?.title === postInput.title) {
			await prisma.post.update({
				where: {
					id: id,
				},
				data: { ...postInput },
			});

			return "User updated";
		}
	}
	@Mutation(() => Post)
	async deletePost(@Arg("id") id: string, @Ctx() req: Request): Promise<string | void> {
		const authToken = req.headers.authorization;
		const token = authToken?.slice(7);

		if (!token) {
			return "No authorized";
		}

		const { userId } = (await getDataTokenPromise(String(token))) as {
			userId: string;
		};

		const result = await prisma.post.findFirst({ where: { id: id } });

		if (result?.userId !== userId) {
			return "No authorized";
		}

		if (result?.userId === userId) {
			await prisma.post.delete({ where: { id: id } });
			return "User deleted";
		}
	}
}
