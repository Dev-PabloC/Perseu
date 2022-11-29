import { verify } from "jsonwebtoken";

export const getDataTokenPromise = async (token: string) => {
	try {
		const data = verify(String(token), String(process.env.JWTKEY));
		return new Promise((resolve, reject) => {
			if (data) {
				resolve(data);
			}
			reject("no data in token");
		});
	} catch (err) {
		return err;
	}
};
