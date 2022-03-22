import { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { MainCurrWeather } from "../cmps/MainCurrWeather";
import { WeatherMainList } from "../cmps/WeatherMainList";
import { weatherService } from "../services/weatherService";
import { addFavorite, getWeather, removeFavorite } from "../store/weatherActions";

export function WeatherMain() {

    const { weather, isDark, degrees } = useSelector((state: RootStateOrAny) => state.weatherReducer)
    const [cityList, setCityList] = useState<Array<any>>([])
    const [searchValue, setSearchValue] = useState<string>('')

    const dispatch = useDispatch()

    const { cityKey, cityName } = useParams()

    const CITY_KEY = cityKey ? +cityKey : null
    const CITY_NAME = cityName || null

    useEffect(() => {
        async function fetchWeather() {
            await dispatch(getWeather(CITY_KEY, CITY_NAME))
        }
        fetchWeather()
    }, [dispatch, CITY_KEY, CITY_NAME])

    async function handleChange(event: any) {
        // const test = [   // Comment if in Productiion
        //     {
        //         LocalizedName: 'Tel aviv',
        //         Country: {
        //             LocalizedName: 'Israel'
        //         }
        //     },
        //     {
        //         LocalizedName: 'London',
        //         Country: {
        //             LocalizedName: 'England'
        //         }
        //     },

        //     {
        //         LocalizedName: 'Tokyo',
        //         Country: {
        //             LocalizedName: 'Japan'
        //         }
        //     },
        // ]
        const query = event.target.value
        let res = /^[a-zA-Z\s]*$/.test(query);
        if (!res) return
        setSearchValue(query)
        // setCityList(test) // Comment if in Productiion
        if (!query) setCityList([])
        setCityList(await weatherService.autoComplete(query)) // Comment if in Develepoment
    }

    async function onSetWeather(cityKey: number, cityName: string) {
        await dispatch(getWeather(cityKey, cityName))
        setSearchValue('')
        setCityList([])
    }

    function handleFavorite(cityKey: number, isFavorite: boolean, cityName: string) {
        isFavorite ?
            dispatch(removeFavorite(cityKey))
            :
            dispatch(addFavorite(cityKey, cityName))
        dispatch(getWeather(cityKey, cityName))
    }

    if (!weather) return <div className={`h100 ${isDark ? 'dark white' : ''}`}>Loading...</div>        
    return (
        <section className={`main flex column align-center h100 ${isDark ? 'dark' : ''}`}>
            <div className={`curr-weather flex column align-center w100 ${isDark ? 'dark-header' : 'not-dark'}`}>
            <div className="seasrch-city flex column align-center container relative">
                <input type="text" onChange={handleChange} value={searchValue} placeholder="Search a different city" className={`search-city-input ${cityList.length ? 'cities-shown' : ''}`} />
                <ul className="city-list absolute w100 scale-in-ver-top">
                    {cityList?.map((city: any) =>
                        <li className={`flex space-between ${isDark ? 'dark-hover' : 'orange-hover white'}`} key={city.Key} onClick={() => onSetWeather(+city.Key, city.LocalizedName)}>
                            <h4 className="city-name-country-list">{city.LocalizedName}</h4>
                            <p className="country-name-city-list">{city.Country.LocalizedName}</p>
                        </li>)}
                </ul>
            </div>
                <div className="curr-weather-header flex column container">
                    {weather.isFavorite ?
                        <AiFillStar className="favorite-icon favorite-filled self-end" onClick={() => handleFavorite(weather.cityKey, weather.isFavorite, weather.cityName)} />
                        :
                        <AiOutlineStar className="favorite-icon self-end" onClick={() => handleFavorite(weather.cityKey, weather.isFavorite, weather.cityName)} />
                    }
                </div>
                {weather && <MainCurrWeather weather={weather.currWeather} cityName={weather.cityName} degrees={degrees} />}
            </div>
                {weather && <WeatherMainList weather={weather} isDark={isDark} degrees={degrees} />}
        </section>
    )
}