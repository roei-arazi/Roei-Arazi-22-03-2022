const weather: any = ''
const favorites: any[] = []
const currCity: any = ''
const isDark: number = 0
const degrees: string = 'C'
const initialState = {
    weather,
    favorites,
    currCity,
    isDark,
    degrees
}

export function weatherReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'SET_WEATHER':
            return {
                ...state,
                weather: action.weather
            }
            case 'SET_FAVORITES':
            return {
                ...state,
                favorites: action.favorites
            }
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: [...state.favorites, action.favorite]
            }
        case 'REMOVE_FAVORITE':                
            return {
                ...state,
                favorites: state.favorites.filter((favorite: any)=> favorite.cityKey !== action.cityKey)
            }
        case 'SWITCH_DARK_MODE':
            return {
                ...state,
                isDark: action.dark
            }
        case 'SWITCH_DEGREES':
            return {
                ...state,
                degrees: action.degrees
            }
        default:
            return state
    }
}