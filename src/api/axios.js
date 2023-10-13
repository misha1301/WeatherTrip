import axios from "axios";

const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

export default axios.create({
    baseURL: BASE_URL,
});