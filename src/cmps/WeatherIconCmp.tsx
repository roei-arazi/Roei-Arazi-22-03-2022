import {
    TiWeatherSunny, TiWeatherPartlySunny, TiWeatherCloudy,
    TiWeatherShower, TiWeatherStormy, TiWeatherSnow, TiWeatherDownpour, TiWeatherWindy, TiWeatherNight
} from "react-icons/ti";

export function WeatherIconCmp(props: any) {

    const { icon, isDark } = props

    return (
        <div className={`weather-icon flex align-center`}>
            {icon > 0 && icon < 4 && <TiWeatherSunny className={isDark ? 'white' : ''} />}
            {icon > 3 && icon < 6 && <TiWeatherPartlySunny className={isDark ? 'white' : ''} />}
            {icon > 5 && icon < 12 && <TiWeatherCloudy className={isDark ? 'white' : ''} />}
            {((icon > 11 && icon < 15) || icon === 18 || (icon > 38 && icon < 41)) && <TiWeatherShower className={isDark ? 'white' : ''} />}
            {((icon > 14 && icon < 18) || (icon > 40 && icon < 43)) && <TiWeatherStormy className={isDark ? 'white' : ''} />}
            {((icon > 18 && icon < 24) || (icon > 42 && icon < 45)) && <TiWeatherSnow className={isDark ? 'white' : ''} />}
            {icon > 23 && icon < 30 && <TiWeatherDownpour className={isDark ? 'white' : ''} />}
            {icon === 32 && <TiWeatherWindy className={isDark ? 'white' : ''} />}
            {icon > 32 && icon < 38 && <TiWeatherNight className={isDark ? 'white' : ''} />}
        </div>
    )
}