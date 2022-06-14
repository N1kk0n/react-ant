import axios from "axios";

export default class Services {
	static async getDocuments(limit, page) {
		const response = await axios.get("https://reqres.in/api/unknown", {
			params: {
				per_page: limit,
				page: page,
			},
		});
		console.log(response);
		return response;
	}
}
