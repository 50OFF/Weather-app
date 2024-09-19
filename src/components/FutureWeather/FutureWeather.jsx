import { useState, useEffect } from 'react';
import "./FutureWeather.css"

import icon1 from '../../assets/weather_icons/1.png';
import icon2 from '../../assets/weather_icons/2.png';
import icon3 from '../../assets/weather_icons/3.png';
import icon4 from '../../assets/weather_icons/4.png';
import icon5 from '../../assets/weather_icons/5.png';
import icon6 from '../../assets/weather_icons/6.png';
import icon7 from '../../assets/weather_icons/7.png';
import icon8 from '../../assets/weather_icons/8.png';
import icon11 from '../../assets/weather_icons/11.png';
import icon33 from '../../assets/weather_icons/33.png';
import icon34 from '../../assets/weather_icons/34.png';

function FutureWeather({data_future}) {

    const icons = {1: icon1, 2: icon2, 3: icon3, 4: icon4, 
                    5: icon5, 6: icon6, 7: icon7, 8: icon8, 
                    11: icon11, 33: icon33, 34: icon34};
    const months = {'01': "января", '02': "февраля", '03': "марта", '04': "апреля", 
                    '05': "мая", '06': "июня", '07': "июля", '08': "августа", 
                    '09': "сентября", '10': "октября", '11': "ноября", '12': "декабря", };
    
    let weather_data_arr = [];

    //выводим данные в переменные
    for (let day of data_future.DailyForecasts) {
        weather_data_arr.push({date: day.Date.slice(8, 10) + '.' + day.Date.slice(5, 7), 
                                temperature: String(day.Temperature.Maximum.Value).slice(0,2) + '°', 
                                description: day.Day.IconPhrase, 
                                icon: icons[day.Day.Icon]})
    }

    return (
        <div className="future_weather">
            {weather_data_arr.map((day, index) => (
            <div className="future_day" key={index}>
                <div className='date'>{day.date}</div>
                <div className="day_info">
                    <div className='temperature'>{day.temperature}</div>
                    <div className='description'>{day.description}</div>
                    <img className='icon' src={day.icon} alt="weather icon" />
                </div>
            </div>
            ))}
        </div>
    )
}

export default FutureWeather;