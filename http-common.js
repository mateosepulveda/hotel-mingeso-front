import axios from "axios";
export default axios.create({
	baseURL: "localhost:8080/tingeso/",
	headers: {
		"Content-type": "application/json",
	}
});