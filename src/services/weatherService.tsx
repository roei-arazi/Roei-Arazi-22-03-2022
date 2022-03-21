import Axios from "axios"
import { localStorageService } from "./localStorageService"

// Default Definitions
const axios = Axios
const API_KEY = '9zsyMmyqAGLIkzuaDcfkXv3ddkM2aPIm'
const WEATHER_KEY = 'Weather'
const FAVORTES_KEY = 'Favorites'
const DARK_KEY = 'Dark'
const DEGREES_KEY = 'Degrees'
const TEL_AVIV_KEY = 215854

// Types
type favorite = {
    cityKey: number,
    cityName: string
}

export const weatherService = {
    getWeather,
    getFavoritesWeather,
    addFavorite,
    removeFavorite,
    autoComplete,
    switchDarkMode,
    switchDegrees
}

async function getWeather(cityKey: number | null, cityName: string | null) {
    // let weatherForecast: any = localStorageService.get(WEATHER_KEY) //Comment if in Production
    let weatherForecast : any  // Comment if in Develepoment  
    let currWeather: any
    try {
        if (!weatherForecast || !weatherForecast.length) {
            weatherForecast = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey || TEL_AVIV_KEY}?apikey=${API_KEY}&metric=true`)
                .then((res: any) => {
                    const weatherToSave = {
                        ...res.data,
                        cityName: cityName || 'Tel Aviv',
                        cityKey: cityKey || TEL_AVIV_KEY,
                        isFavorite: _checkIfFavorite(cityKey || TEL_AVIV_KEY)
                    }
                    return weatherToSave
                });
            currWeather = await _getCurrWeather(weatherForecast.cityKey)
            weatherForecast = { ...weatherForecast, currWeather }
        } else { // Handle Local Storage Loading
            weatherForecast = {
                ...JSON.parse(weatherForecast),
                cityName: 'Tel Aviv',
                cityKey: TEL_AVIV_KEY,
                isFavorite: _checkIfFavorite(cityKey || TEL_AVIV_KEY)
            }
        }
        localStorageService.set(WEATHER_KEY, JSON.stringify(weatherForecast))
        return weatherForecast
    } catch (err: any) {
        console.log(err);
    }
}

async function _getCurrWeather(cityKey: number) {
    const currWeather = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`)
        .then(res => res.data[0])
    return currWeather
}

async function getFavoritesWeather() {
    let favorites = localStorageService.get(FAVORTES_KEY)
    try {
        if (favorites) {
            const favoritesData = await Promise.all(JSON.parse(favorites).map(async (favorite: favorite) => {
                const data = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${favorite.cityKey}?apikey=${API_KEY}`)
                    .then(res => res.data[0])
                return { ...data, ...favorite }
            }))
            return favoritesData
        }
    } catch (err: any) {
        console.log(err);
    }
}

async function addFavorite(cityKey: number, cityName: string) {
    let favorites
    const favorite = {
        cityKey,
        cityName
    }
    try {
        const favoritesStored = localStorageService.get(FAVORTES_KEY)
        if (favoritesStored) {
            favorites = [...JSON.parse(favoritesStored), favorite]
            localStorageService.set(FAVORTES_KEY, JSON.stringify(favorites))
        } else localStorageService.set(FAVORTES_KEY, JSON.stringify([favorite]))
        return favorite
    } catch (err: any) {
        console.log(err);
    }
}

async function removeFavorite(cityKey: number) {
    let favorites
    try {
        const favoritesStored = localStorageService.get(FAVORTES_KEY)
        if (favoritesStored) {
            favorites = JSON.parse(favoritesStored).filter((favorite: favorite) => +favorite.cityKey !== cityKey)
            localStorageService.set(FAVORTES_KEY, JSON.stringify(favorites))
        }
    } catch (err: any) {
        console.log(err);
    }
}

async function autoComplete(query: string) {
    try {
        const cityList = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${query}`)
            .then((res: any) => res.data)
        return cityList.length > 4 ? cityList.slice(0, 4) : cityList
    } catch (err: any) {
        console.log(err);
    }
}

function switchDarkMode(isDark: number | null) {
    let dark:any =localStorageService.get(DARK_KEY)
    if (isDark !== null) {        
        localStorageService.set(DARK_KEY, isDark)
        dark = isDark
    }
    if(!dark){
        if(+dark !== 0 || +dark !== 1) dark=0
        localStorageService.set(DARK_KEY, dark)
    }
    return +dark
}

function switchDegrees(temp: string | null) {
    let degrees:any =localStorageService.get(DEGREES_KEY)
    if (temp) {        
        localStorageService.set(DARK_KEY, temp)
        degrees = temp
    }
    if(!degrees){
        degrees = 'C'
        localStorageService.set(DARK_KEY, degrees)
    }
    return degrees
}

function _checkIfFavorite(cityKey: number) {
    const favoritesStored = localStorageService.get(FAVORTES_KEY)
    if (favoritesStored) {
        const findFavorite = JSON.parse(favoritesStored).find((favorite: favorite) => +favorite.cityKey === cityKey)
        if (findFavorite) return true
        return false
    }
}

