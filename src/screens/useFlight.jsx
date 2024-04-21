import axios from "axios";
import {useEffect} from "react";
import {useMemo} from "react";
import {useState} from "react";

const useFlight = () => {
	const [origin, setOrigin] = useState("");
	const [destination, setDestination] = useState("");
	const [type, setType] = useState("distance");
	const [pathData, setData] = useState(null);
	const [pathLoading, setLoading] = useState(false);
	const [pathError, setError] = useState(null);

	const handleOrigin = useMemo(
		() => (origin) => {
			setOrigin(origin);
		},
		[]
	);

	const handleDestination = useMemo(
		() => (destination) => {
			setDestination(destination);
		},
		[]
	);

	const handleType = useMemo(
		() => (type) => {
			setType(type);
		},
		[]
	);

	useEffect(() => {
		if (origin && destination && type) {
			console.log(origin, destination);
			setLoading(true);

			const fetchPath = async () => {
				try {
					const response = await axios.get(`http://localhost:3001/v1/graphs/shortestPath?start=${origin}&end=${destination}&type=${type}`);
					if (response.status === 200) {
						setData(response.data.data);
					} else {
						throw new Error("Failed to fetch data");
					}
				} catch (err) {
					const message = err.response ? err.response.data.message : err.message;
					setError(message);
				} finally {
					setLoading(false);
				}
			};

			fetchPath();
		}
	}, [origin, destination, type]);

	return {origin, destination, type, handleOrigin, handleDestination, handleType, pathData, pathLoading, pathError};
};

export default useFlight;
