import { useEffect, useState } from "react"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { WeatherFavoritesPreview } from "../cmps/WeatherFavoritesPreview"
import { weatherService } from "../services/weatherService"

export function WeatherFavorites() {

    const { isDark, degrees } = useSelector((state: RootStateOrAny) => state.weatherReducer)

    const [favoritesData, setFavoritesData] = useState<any>()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchFavorites(){
            setFavoritesData(await weatherService.getFavoritesWeather())
        }
        fetchFavorites()
    }, [dispatch])

    function showWeather(cityKey:number, cityName:string){    
        navigate(`/${cityKey}/${cityName}`)
    }
    
    return (
        <section className={`w100 h100 ${isDark ? 'dark' : ''}`}>
            <div className="favorite-list flex justify-center wrap container">
                {favoritesData && favoritesData.length ? favoritesData.map((favorite:number, idx:number) =>
                    <WeatherFavoritesPreview key={idx} favorite={favorite} isDark={isDark} degrees={degrees} showWeather={showWeather} />)
                    :
                    <h1 className={isDark ? 'white' : ''}>No Favorites yet...</h1>
                }
            </div>
        </section>
    )
}