import { WeatherMainPreview } from "./WeatherMainPreview";

export function WeatherMainList(props: any) {
    const { weather, isDark, degrees } = props
    const { DailyForecasts } = weather

    return (
        <div className="weather-list flex justify-center wrap w100">
            {DailyForecasts.map((daily: any, index: number) => <WeatherMainPreview key={index} daily={daily} isDark={isDark} degrees={degrees} />)}
        </div>
    )
}