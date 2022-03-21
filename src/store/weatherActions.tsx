import { weatherService } from "../services/weatherService";

export function getWeather(cityKey:number | null, cityName: string | null){
    return async (dispatch:any)=>{
        const weather = await weatherService.getWeather(cityKey, cityName);                        
        dispatch({type: 'SET_WEATHER', weather})
    }
}

export function getWeatherFavorites(){
    return async (dispatch:any)=>{
        const favorites = await weatherService.getFavoritesWeather();
        dispatch({type: 'SET_FAVORITES', favorites})
    }
}

export function addFavorite(cityKey:number, cityName: string) {
    return async (dispatch: any) => {
        const favorite = await weatherService.addFavorite(cityKey, cityName);        
        dispatch({ type: 'ADD_FAVORITE', favorite })
    }
}

export function removeFavorite(cityKey:number) {
    return async (dispatch: any) => {
        await weatherService.removeFavorite(cityKey);
        dispatch({ type: 'REMOVE_FAVORITE', cityKey })
    }
}

export function applyDarkMode(isDark: number | null) {
    return async (dispatch: any) => {
        const dark = weatherService.switchDarkMode(isDark);                
        dispatch({ type: 'SWITCH_DARK_MODE', dark })
    }
}
export function applyDegrees(temp: string | null) {
    return async (dispatch: any) => {
        const degrees = weatherService.switchDegrees(temp);                
        dispatch({ type: 'SWITCH_DEGREES', degrees })
    }
}