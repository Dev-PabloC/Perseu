import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class Info {
	@Field({ nullable: true })
	age: string;

	@Field({ nullable: true })
	about: string;
}

@InputType()
export class InfoInput {
	@Field()
	age: string;

	@Field()
	about: string;
}
