import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export const useAirport = () => {
  const [airportData, setData] = useState([]);
  const [airportLoading, setLoading] = useState(true);
  const [airportError, setError] = useState("");

  const fetchAirports = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/v1/airports");
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
  }, []); // Empty dependency array means the function is created only once per component lifecycle.

  useEffect(() => {
    fetchAirports();
  }, [fetchAirports]); // Dependency on fetchAirports ensures useEffect is called when the function is available.

  return {  airportData,  airportLoading, airportError };
};
