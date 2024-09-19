import { useState, useEffect, useRef } from 'react'
import "./SearchBar.css"
import search_icon from "../../assets/other/search_icon.png"


function SearchBar({city_code, setCity_code, setCity}) {
    const [inputValue, setInputValue] = useState('');
    const [cityArr, setCityArr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const hasRendered = useRef(false);

    async function fetchData(query, data_setter) {
        setLoading(true); // Устанавливаем состояние загрузки
        setError(null); // Сбрасываем предыдущее состояние ошибки

        try {
            const response = await fetch(query); // Выполняем запрос
            if (!response.ok) {
                throw new Error('Сеть не отвечает'); // Обрабатываем ошибки сети
            }
            const result = await response.json(); // Парсим ответ в формате JSON
            data_setter(result); // Сохраняем результат в состояние
        } catch (error) {
            setError(error.message); // Устанавливаем ошибку в состояние
        } finally {
            setLoading(false); // Сбрасываем состояние загрузки
        }
      };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


    function handleClick() {
        const citySearchQuery = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Kj9QodDAMM0EYhAdx5AADsqhUt9jaYgy&q=${encodeURIComponent(inputValue)}&language=ru-ru`;

        fetchData(citySearchQuery, setCityArr);

        setInputValue("");
    }

    

    useEffect(() => {
        if (hasRendered.current) {
            if (city_code !== cityArr[0].Key) {
                setCity_code(cityArr[0].Key);
                setCity(cityArr[0].LocalizedName)
            }
        } else {
            hasRendered.current = true;
        }
    }, [cityArr]);

    return (
        <div className="search_bar">
            <input onChange={handleInputChange} className="search_input" type="text" value={inputValue} placeholder="Другой город"></input>
            <button onClick={handleClick} className="search_button">
                <img src={search_icon} alt="" />
            </button>
        </div>
    )
}

export default SearchBar