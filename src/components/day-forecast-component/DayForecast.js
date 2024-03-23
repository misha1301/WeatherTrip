import React from "react";
import './day_forecast.css';
import Moment from "moment";
import {Icon} from '../weather-icon-group/WeatherIcons'

const DayForecast = ({tempMin, tempMax, day, iconName}) => {
    return (
        <article className='day_forecast-article'>
            <h1>
                {Moment(day,"YYYY-MM-DD").format('dddd')}
            </h1>
            <figure className='figure'>
                <img src={Icon[iconName]} alt={'icon'} height={45} width={45}/>
            </figure>
            <p>
                {tempMax}&#176;/{tempMin}&#176;
            </p>
        </article>
    );
}

export default DayForecast;