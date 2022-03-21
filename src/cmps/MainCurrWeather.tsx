import { WiCelsius, WiFahrenheit } from "react-icons/wi"
import { WeatherIconCmp } from "./WeatherIconCmp"

export function MainCurrWeather(props: any) {
    const { weather, cityName, degrees } = props

    const { Temperature, WeatherText, WeatherIcon } = weather

    return (
        <div className="curr-weather-info column flex align-center space-around h100">
            <h4 className='white self-center j-self-center'>{cityName}</h4>
            <div className="flex align-center">
                {degrees === 'C' ?
                    <h4>{Math.round(Temperature.Metric.Value)}<WiCelsius /></h4>
                    :
                    <h4>{Math.round(Temperature.Imperial.Value)}<WiFahrenheit /></h4>
                }
                <WeatherIconCmp icon={WeatherIcon} />
            </div>
            <p>{WeatherText}</p>
        </div>
    )
}