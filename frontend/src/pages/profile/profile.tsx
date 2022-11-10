import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import type { getUser, PostMapInGetUser, InfoMapInGetUser } from "../../utils/type";
import { Navbar } from "../../partials/navbar/navbar";
import { Footer } from "../../partials/footer/footer";

export function Profile() {
	const { name } = useParams();
	const GETUSER = gql`
		query GetUniqueUser($username: String!) {
			getUniqueUser(username: $username) {
				id
				email
				username
				posts {
					id
					title
					content
				}
				info {
					id
					about
					age
				}
			}
		}
	`;
	const { data, error, loading } = useQuery(GETUSER, {
		variables: {
			username: `${name}`,
		},
	});
	if (loading) {
		return (
			<>
				<Navbar />
				<div className="profile-message-loading">Loading</div>
				<Footer />
			</>
		);
	}
	if (error) {
		return (
			<>
				<Navbar />
				<span className="profile-message-error">User not found</span>
				<Footer />
			</>
		);
	}
	const { getUniqueUser } = data;

	return (
		<>
			<Navbar />
			
			<div className="profile-container" key={getUniqueUser}>
				<h2 className="profile-username">{getUniqueUser.username}</h2>
				<span className="profile-email">{getUniqueUser.email}</span>
				<div className="profile-posts"></div>
			</div>
			<Footer />
		</>
	);
}
