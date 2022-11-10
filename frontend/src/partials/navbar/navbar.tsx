import { Link } from "react-router-dom";
import "./style.css";
export function Navbar() {
	return (
		<>
			<div className="nav-container">
				<nav className="navbar">
					<Link to="/" className="link-item">
						HOME
					</Link>
					<Link to="/posts" className="link-item">
						POSTS
					</Link>
					<Link to="/profile" className="link-item">
						PROFILE
					</Link>
					<Link to="/auth/login" className="link-item">
						LOGIN
					</Link>
					<Link to="/auth/register" className="link-item">
						SIGNUP
					</Link>
				</nav>
			</div>
		</>
	);
}
