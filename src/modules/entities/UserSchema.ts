import { Info } from "./infoSchema";
import { Post } from "./PostSchema";
import { ObjectType, Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
	@Field()
	username: string;

	@Field()
	email: string;

	@Field()
	password: string;
}

@InputType()
export class UpdateUserInput {
	@Field({ nullable: true })
	username?: string;

	@Field({ nullable: true })
	email?: string;

	@Field({ nullable: true })
	password?: string;
}

@ObjectType()
export class User {
	@Field()
	id: string;

	@Field()
	username: string;

	@Field()
	email: string;

	@Field(() => [Post])
	posts: Post;

	@Field(() => [Info])
	info: Info;

	@Field({ nullable: true })
	password: string;

	@Field()
	admin: boolean;
}

@ObjectType()
export class UserCreate {
	@Field()
	username: string;

	@Field()
	email: string;

	@Field({ nullable: true })
	password: string;
}
