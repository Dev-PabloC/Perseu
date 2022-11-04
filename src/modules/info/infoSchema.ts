import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Info {
	@Field({ nullable: true })
	age: string;

	@Field({ nullable: true })
	about: string;
}
