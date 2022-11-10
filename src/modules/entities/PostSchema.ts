import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class Post {
	@Field({ nullable: true })
	title: string;

	@Field({ nullable: true })
	content: string;
}

@InputType()
export class PostInput {
	@Field()
	title: string;

	@Field()
	content: string;
}
