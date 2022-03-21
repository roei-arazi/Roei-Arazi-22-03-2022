import { WiCelsius, WiFahrenheit } from 'react-icons/wi'
import { WeatherIconCmp } from "./WeatherIconCmp";

export function WeatherFavoritesPreview(props: any) {
    const { favorite, showWeather, isDark, degrees } = props

    const { cityKey, cityName, Temperature, WeatherText, WeatherIcon } = favorite

    return (
        <div className="weather-favorite-preview flex column space-between align-center" onClick={() => showWeather(cityKey, cityName)}>
            <h4 className={isDark ? 'white' : ''}>{cityName}</h4>
            <div className='flex align-center'>
                {degrees ==='C' ?
                <h4 className={isDark ? 'white' : ''}>
                {Math.round(Temperature.Metric.Value)}<WiCelsius />
                </h4>
                :
                <h4 className={isDark ? 'white' : ''}>
                    {Math.round(Temperature.Imperial.Value)}<WiFahrenheit />
                    </h4>}
                
                <WeatherIconCmp icon={WeatherIcon} isDark={isDark} />
            </div>
            <p className={isDark ? 'white' : ''}>{WeatherText}</p>
        </div>
    )
}