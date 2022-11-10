import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Auth } from "./pages/auth/auth";

export function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth" element={<Auth />} />
			</Routes>
		</>
	);
}
