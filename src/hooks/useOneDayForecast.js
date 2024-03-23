import {useState, useEffect} from "react";
import axios from "../api/axios";

const weaterApiKey = process.env.REACT_APP_WEATHER_API_KEY;

const API_URL = `/today?unitGroup=metric&key=${weaterApiKey}&contentType=json`;

const useOneDayForecast = (selectedTrip) => {
    const [dayForecast, setDayForecast] = useState({});
    const [error, setError] = useState(false);
    const [errorStatus, setErrorStatus] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!selectedTrip.country) return;
        const controller = new AbortController();
        setLoading(true);
        axios
            .get(selectedTrip.country + API_URL, {signal: controller.signal})
            .then((response) => {
                setDayForecast(response.data?.["days"].at(0));
                setError(false);
                setErrorStatus('')
            })
            .catch((err) => {
                setError(true);
                setErrorStatus(err.response?.status);
            })
            .finally(() => {
                setLoading(false);
            });
        return () => {
            controller.abort();
        }

    }, [selectedTrip]);

    return [dayForecast, error, errorStatus, loading];
}

export  default useOneDayForecast;