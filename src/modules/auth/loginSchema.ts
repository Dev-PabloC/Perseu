import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Login {
	@Field({ nullable: true })
	email: string;

	@Field({ nullable: true })
	password: string;
}

@ObjectType()
export class TokenLogin {
	@Field({ nullable: true })
	token: string;
}
