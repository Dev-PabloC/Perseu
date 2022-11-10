import { Navbar } from "../../partials/navbar/navbar";
import { Footer } from "../../partials/footer/footer";
import "./style.css";
export function Home() {
	return (
		<>
			<Navbar />

			<div className="home-container">
				<h1>a project made for API consumption</h1>
			</div>

			<div className="OBS">
				note: the front is not intended to show skills, so it won't be responsive or well designed.
			</div>

			<Footer />
		</>
	);
}
