import moment from "moment";
import { WiCelsius, WiFahrenheit } from "react-icons/wi";
import { WeatherIconCmp } from "./WeatherIconCmp";

export function WeatherMainPreview(props: any) {
    const { daily, isDark, degrees } = props
    const { Date, Day, Temperature } = daily
    return (
        <div className="weather-preview flex column space-between align-center">
            <h4 className={`preview-desktop ${isDark ? 'white' : ''}`}>{moment(Date).format('dddd')}</h4>
            <h4 className={`preview-mobile ${isDark ? 'white' : ''}`}>{moment(Date).format('ddd').toUpperCase()}</h4>
            <WeatherIconCmp icon={Day.Icon} isDark={isDark} />

            {degrees === 'C' ?
                <h4 className={`preview-desktop ${isDark ? 'white' : ''}`}>
                    {Math.round(Temperature.Minimum.Value)}<WiCelsius /> - {Math.round(Temperature.Maximum.Value)}<WiCelsius />
                </h4>
                :
                <h4 className={`preview-desktop ${isDark ? 'white' : ''}`}>
                    {Math.round((Temperature.Minimum.Value * 1.8) + 32)}<WiFahrenheit /> - {Math.round((Temperature.Minimum.Value * 1.8) + 32)}<WiFahrenheit />
                </h4>
            }

            <p className={`preview-desktop ${isDark ? 'white' : ''}`}>{Day.IconPhrase}</p>
            {
                degrees === 'C' ?
                    <h4 className={`preview-mobile ${isDark ? 'white' : ''}`}>
                        {Math.round((Temperature.Minimum.Value + Temperature.Maximum.Value) / 2)}<WiCelsius />
                    </h4>
                    :
                    <h4 className={`preview-mobile ${isDark ? 'white' : ''}`}>
                        {Math.round((Temperature.Minimum.Value + Temperature.Maximum.Value) / 2 * 1.8 + 32)}<WiCelsius />
                    </h4>
            }
        </div>
    )
}