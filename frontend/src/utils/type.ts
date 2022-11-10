export type getUser = {
	id: string;
	username: string;
	email: string;
	info: [];
	posts: [];
};
export type PostMapInGetUser = {
	id: string;
	title: string;
	content: string;
};
export type InfoMapInGetUser = {
	id: string;
	about: string;
	age: string;
};
