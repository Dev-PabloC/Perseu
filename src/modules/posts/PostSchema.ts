import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Post {
	@Field({ nullable: true })
	title: string;

	@Field({ nullable: true })
	content: string;
}
