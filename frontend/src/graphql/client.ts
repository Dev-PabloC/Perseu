import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: "https://g9lgns-4000.preview.csb.app/",
	cache: new InMemoryCache(),
});
