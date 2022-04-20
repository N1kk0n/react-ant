import axios from "axios";

export default class Services {
	static async getUsers(limit, page) {
		const response = await axios.get(
			"https://jsonplaceholder.typicode.com/users",
			{
				params: {
					_limit: limit,
					_page: page,
				},
			}
		);
		return response;
	}
}
