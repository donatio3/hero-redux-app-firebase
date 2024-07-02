export const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    filterChooseActive: 'all'
}   

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
              
            }

        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }

        case 'HERO_DELETED':
            return {
                ...state, 
                heroes: state.heroes.filter(item => item.id !== action.payload)
            }       
        case 'HERO_ADDED':
            return {
                ...state, 
                heroes: [...state.heroes, action.payload]
            }

        case 'FILTERS_FETCHING':
            return {
                ...state, 
                filtersLoadingStatus: 'loading'
            }

        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state, 
                filtersLoadingStatus: 'error'
            }

        case 'FILTERS_FETCHED':
            return {
                ...state, 
                filters: [...action.payload],
                filtersLoadingStatus: 'idle'
            }
        case 'FILTER_ACTIVE':
            return {
                ...state, 
                filterChooseActive: action.payload
            }
        case 'HEROES_FILTRED':
            return {
                ...state,
                filteredHeroes: action.payload ,
                heroesLoadingStatus: 'idle'
            }
        default: return state
    }
}

export default reducer;