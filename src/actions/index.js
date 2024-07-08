import { createAction } from "@reduxjs/toolkit";
import { heroesFetched, heroesFetchingError, heroesFetching } from "../components/heroesList/heroesSlice";
// import { filtersFetching, filtersFetched, filtersFetchingError } from "../components/heroesFilters/filtersSlice";
import { useDatabase } from "../hooks/http.hook";

// export const fetchHeroes = (request) => (dispatch) => {
//     dispatch(heroesFetching());
//     request("http://localhost:3001/heroes")
//         .then(data => dispatch(heroesFetched(data)))
//         .catch(() => dispatch(heroesFetchingError()))
// }


export const fetchFilters = (getFilters) => (dispatch) => {
    dispatch(filtersFetching())
    getFilters()
    .then((data) => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()))

    // request("http://localhost:3001/filters")
    // .then((data) => dispatch(filtersFetched(data)))
    // .catch(() => dispatch(filtersFetchingError()))
}


// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// ПРИМЕНЕНИЕ CREATEACTION 

// export const heroesFetching = createAction('HEROES_FETCHING')


// export const heroesFetched = (heroes) => {
//     console.log(heroes, 'heroes ISSSSSSS')
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetched = createAction('HEROES_FETCHED')

// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR')

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }


// export const deleteHero = (id) => {
//     console.log(id, 'id')
//     return {
//         type: 'HERO_DELETED',   
//         payload: id
//     }
// }

// export const deleteHero = createAction('HERO_DELETED')

// export const addHero = (value) => {
//     return {
//         type: 'HERO_ADDED',
//         payload: value
//     }
// }

// export const addHero = createAction('HERO_ADDED')



// !!!!!!!!!!!!!!!!  filters

 

export const filtersFetching = createAction('FILTERS_FETCHING')
export const filtersFetched = createAction('FILTERS_FETCHED')
export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR')
export const filterActive = createAction('FILTER_ACTIVE')


// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING',
//     }
// }

// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR',
//     }
// }


// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }


// export const filterActive = (filter) => {
//     return {
//         type: 'FILTER_ACTIVE',
//         payload: filter
//     }
// }


// export const heroesFiltred = (filter) => {
//     console.log()
//     return {
//         type: 'HEROES_FILTRED',
//         payload: filter
//     }
// }
