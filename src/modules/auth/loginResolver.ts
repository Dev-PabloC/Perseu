import "reflect-metadata";
import { Request } from "express";
import { Resolver, Field, Arg, Mutation, InputType, Query } from "type-graphql";
import { prisma } from "../../database/prismaConnection";
import * as jwt from "jsonwebtoken";
import { Login, TokenLogin } from "./loginSchema";

@InputType()
class LoginInput {
	@Field()
	email: string;

	@Field()
	password: string;
}

@Resolver()
export class LoginResolver {
	@Mutation(() => TokenLogin)
	async loginToken(@Arg("loginInput") loginInput: LoginInput) {
		const { id, username, email, password } = (await prisma.user.findFirst({ where: { email: loginInput.email } })) as {
			email: string;
			password: string;
			id: string;
			username: string;
		};

		if (password === loginInput.password) {
			const token = jwt.sign(
				{
					userId: id,
					email: email,
					name: username,
				},
				String(process.env.JWTKEY),
			);

			return {
				Login,
				token,
			};
		}
	}
}
