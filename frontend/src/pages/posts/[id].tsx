import { useParams } from "react-router-dom";

export function UniquePost() {
	const { id } = useParams() as { id: string };
	return (
		<>
			<div>Hello unique post</div>
		</>
	);
}
