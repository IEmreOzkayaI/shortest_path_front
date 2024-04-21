import axios from "axios";
import {useEffect} from "react";
import {useState} from "react";

const useSetup = () => {
	const [setupData, setData] = useState(null);

	useEffect(() => {
		const fetchPath = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/v1/graphs/setup`);
				if (response.status === 200) {
					setData(response.data.message);
				} else {
					throw new Error("Failed to fetch data");
				}
			} catch (err) {
				const message = err.response ? err.response.data.message : err.message;
				console.log(message);
			}
		};

		fetchPath();
	}, []);

	return {setupData};
};

export default useSetup;
