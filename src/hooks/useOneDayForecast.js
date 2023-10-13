import {useState, useEffect} from "react";
import axios from "../api/axios";

const API_URL = `/today?unitGroup=metric&include=days&key=L69W8BHDXPVM8LBWXVK5E8TBU&contentType=json`;

const useOneDayForecast = ({selectedTrip}) => {
    const [dayForecast, setDayForecast] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("City changes: ", selectedTrip.country);
        if(!selectedTrip.country) return;
        const controller = new AbortController();
        setLoading(true);
        setError(false);
        axios
            .get(selectedTrip.country + API_URL, {signal: controller.signal})
            .then((response) => {
                console.log(response.data);
                setDayForecast(response.data?.["days"].at(0));
            })
            .catch((err) => {
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
        return () => {
            controller.abort();
        }

    }, [selectedTrip]);

    return { dayForecast, error, loading};
}

export  default useOneDayForecast;