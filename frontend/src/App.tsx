import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import Auth from "./pages/auth/auth";
import { Posts } from "./pages/posts/posts";
import { UniquePost } from "./pages/posts/[id]";
import { Profile } from "./pages/profile/profile";

export function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth/login" element={<Auth.login />} />
				<Route path="/auth/register" element={<Auth.register />} />
				<Route path="/posts" element={<Posts />} />
				<Route path="/posts/:id" element={<UniquePost />} />
				<Route path="/profile/:name" element={<Profile />} />
			</Routes>
		</>
	);
}
