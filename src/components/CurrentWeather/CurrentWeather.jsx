import { useState, useEffect } from 'react';
import "./CurrentWeather.css"

function CurrentWeather({data_now, city}) {

    const months = {'01': "января", '02': "февраля", '03': "марта", '04': "апреля", 
                    '05': "мая", '06': "июня", '07': "июля", '08': "августа", 
                    '09': "сентября", '10': "октября", '11': "ноября", '12': "декабря", };

    //выводим данные в переменные
    const temperature = String(data_now[0].Temperature.Value).slice(0, 2) + '°';
    const date = data_now[0].DateTime.slice(8, 10) + ' ' + months[data_now[0].DateTime.slice(5, 7)];
    const description = data_now[0].IconPhrase;
    
    return (
        <div className='current_weather'>
            <div className="current_weather_data">
                <div className="current_city_date current_weather_item">
                    <div className="current_city">{city}</div>
                    <div className="current_date">{date}</div>
                </div>
                <div className="current_temp_phrase current_weather_item">
                    <div className="current_temperature ">{temperature}</div>
                    <div className='current_phrase '>{description}</div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather