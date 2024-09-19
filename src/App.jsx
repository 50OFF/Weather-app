import { useState, useEffect } from 'react'
import './App.css'
import CurrentWeather from './components/CurrentWeather/CurrentWeather'
import FutureWeather from './components/FutureWeather/FutureWeather'
import SearchBar from './components/SearchBar/SearchBar'

function App() {
  const [data_5_day, setData_5_day] = useState({});
  const [data_now, setData_now] = useState({});
  const [city_code, setCity_code] = useState("294021");
  const [city, setCity] = useState("Москва")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Запрос после изменения city
  useEffect(() => {
    //ссылки для запроса, надо менять в них код города при поиске!!!
    const weather_5_day_query = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city_code}?apikey=Kj9QodDAMM0EYhAdx5AADsqhUt9jaYgy&language=ru-ru&metric=true`
    const weather_now_query = `http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${city_code}?apikey=Kj9QodDAMM0EYhAdx5AADsqhUt9jaYgy&language=ru-ru&metric=true`

    // Функция запроса данных
    async function fetchData(query, data_setter) {
      try {
          const response = await fetch(query);
          if (!response.ok) {
          throw new Error('Ошибка сети');
          }
          const result = await response.json();
          data_setter(result);

      } catch (err) {
          setError(err.message);
      } finally {
          setLoading(false);
      }
    };
    
    // Запрос данных на настоящий момент и на следующие 5 дней
    fetchData(weather_5_day_query, setData_5_day);
    fetchData(weather_now_query, setData_now);
  }, [city_code]);

  if (data_5_day.DailyForecasts && data_5_day.DailyForecasts.length > 0 && data_now && data_now.length) {
    return (
      <>
        <CurrentWeather data_now={data_now} city={city}/>
        <div className='side_bar'>
          <SearchBar city_code={city_code} setCity_code={setCity_code} setCity={setCity}/>
          <FutureWeather data_future={data_5_day}/>
        </div>
      </>
    )
  }
}

export default App
