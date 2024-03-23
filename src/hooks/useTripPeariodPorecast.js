import { useState, useEffect } from "react";
import axios from "../api/axios";
import Moment from 'moment';
const weaterApiKey = process.env.REACT_APP_WEATHER_API_KEY;

const useTripPeariodPorecast = (selectedTrip) => {
  const [tripForecast, setTripForecast] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedTrip.country) return;
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    axios
      .get(getURLForSelectedTrip(selectedTrip.country, selectedTrip.startDate, selectedTrip.endDate), { signal: controller.signal })
      .then((response) => {
        setTripForecast(response.data.days);
        setError(false);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, [selectedTrip]);

  return [tripForecast, error, loading];
};

const getURLForSelectedTrip = (location, date1, date2) => {
  return `/${location}/${Moment(date1).format('YYYY-MM-DD')}/${Moment(date2).format('YYYY-MM-DD')}?unitGroup=metric&key=${weaterApiKey}&include=current`;
};

export default useTripPeariodPorecast;
