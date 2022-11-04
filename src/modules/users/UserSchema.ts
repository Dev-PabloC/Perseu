import { Info } from "../info/infoSchema";
import { Post } from "../posts/PostSchema";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class User {
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
