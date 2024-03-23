import React, { useEffect, useState } from "react";
import Moment from "moment";
import "./current_day_forecast.css";
import { Icon } from "../weather-icon-group/WeatherIcons";
import { getErrorMsg } from '../../content'

const CurrentDayForecast = ({
  cityName,
  temp,
  icon,
  day,
  ifErrorByLoading,
  ifLoading,
  errorStatus,
}) => {
  
  return (
    <section className="current_day_forecast-section">
      <h3 className="current_day_forecast-day">{Moment(day).format("dddd")}</h3>
      <div className="current_day_forecast-div">
        {ifLoading ? (
          <>
            <img id="loading_icon" srcSet={Icon?.wind} alt={"loading icon"} />
          </>
        ) : ifErrorByLoading ? (
          <>
            <img id="error_icon" srcSet={Icon?.error} alt={"error icon"} />
          </>
        ) : (
          <>
            <img srcSet={Icon?.[icon]} alt={"rain icon"} />
            <p className="current_day_forecast-temp">
              {temp}
              <sup>&deg;C</sup>
            </p>
          </>
        )}
      </div>
      {ifErrorByLoading && <h3 className="current_day_forecast-error_message">{getErrorMsg(errorStatus)}</h3>}
      <h2 className="current_day_forecast-city">{cityName}</h2>
    </section>
  );
};

export default CurrentDayForecast;
