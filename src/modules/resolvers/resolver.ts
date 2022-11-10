import { UserResolver } from "./userResolver";
import { PostResolver } from "./postResolver";
import { LoginResolver } from "./loginResolver";
import { InfoResolver } from "./infoResolver";

export const resolvers = [UserResolver, PostResolver, LoginResolver, InfoResolver] as const;
