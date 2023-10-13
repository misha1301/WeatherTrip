import React from "react";
import Moment from 'moment';
import './current_day_forecast.css'
import {Icon} from '../weather-icon-group/WeatherIcons'

const CurrentDayForecast = ({cityName,temp, icon, day, }) => {

    return(
        <section className='current_day_forecast-section'>
            <h3 className='current_day_forecast-day'>{ Moment(day).format('dddd')}</h3>
            <div className='current_day_forecast-div'>
                <img srcSet={Icon?.[icon]} alt={'rain icon'} />
                <p className='current_day_forecast-temp'>{temp}<sup>&deg;C</sup></p>
            </div>
            <h2 className='current_day_forecast-city'>{cityName}</h2>
        </section>
    );
}

export  default CurrentDayForecast;