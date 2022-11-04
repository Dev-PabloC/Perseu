import "reflect-metadata";
import { Request } from "express";
import { Resolver, Field, Arg, Mutation, InputType, Query, Ctx } from "type-graphql";
import { prisma } from "../../database/prismaConnection";
import { Info } from "./infoSchema";
import { verify } from "jsonwebtoken";

@InputType()
class InfoInput {
	@Field({ nullable: true })
	age: string;

	@Field({ nullable: true })
	about: string;
}

@Resolver()
export class InfoResolver {
	@Query(() => Info)
	async getInfo(@Ctx("req") req: Request) {
		const authToken = req.headers.authorization;
		const token = authToken?.slice(7);

		if (!token) {
			return "No authorized";
		}

		const { userId, email } = verify(String(token), String(process.env.JWTKEY)) as {
			userId: string;
			email: string;
		};

		return prisma.info.findFirst({ where: { userId: userId } });
	}

	@Mutation(() => Info)
	async createInfo(@Arg("infoInput") infoInput: InfoInput, @Ctx("req") req: Request) {
		const authToken = req.headers.authorization;
		const token = authToken?.slice(7);

		if (!token) {
			return "No authorized";
		}

		const { userId, email } = verify(String(token), String(process.env.JWTKEY)) as {
			userId: string;
			email: string;
		};

		const result = await prisma.user.findFirst({ where: { id: userId } });

		if (result?.id === userId) {
			return prisma.user.update({
				where: { id: userId },
				data: {
					info: {
						create: { ...infoInput },
					},
				},
			});
		}
	}

	@Mutation(() => Info)
	async updateInfo(@Arg("infoInput") infoInput: InfoInput, @Ctx("req") req: Request, @Arg("id") id: string) {
		const authToken = req.headers.authorization;
		const token = authToken?.slice(7);

		if (!token) {
			return "No authorized";
		}

		const { userId, email } = verify(String(token), String(process.env.JWTKEY)) as {
			userId: string;
			email: string;
		};

		const result = await prisma.user.findFirst({ where: { id: userId } });

		if (result?.id === userId) {
			return prisma.info.update({
				where: { id: id },
				data: { ...infoInput },
			});
		}
	}

	@Mutation(() => Info)
	async deleteInfo(@Arg("id") id: string, @Ctx("req") req: Request) {
		if (!id) {
			return "Send a ID";
		}
		const authToken = req.headers.authorization;
		const token = authToken?.slice(7);

		if (!token) {
			return "No authorized";
		}

		const { userId, email } = verify(String(token), String(process.env.JWTKEY)) as {
			userId: string;
			email: string;
		};

		const result = await prisma.user.findFirst({ where: { id: userId } });

		if (result?.id === userId) {
			return prisma.info.delete({ where: { id: id } });
		}
	}
}
