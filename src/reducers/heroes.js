import { createReducer } from "@reduxjs/toolkit"

import {
    heroesFetching, 
    heroesFetched,
    heroesFetchingError,
    deleteHero,
    addHero,
} from '../components/heroesList/HeroesList'

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}   


// createReducer нужен если нужно менять вложенные свойства
// он автоматически делает имутабельность, и для упрощения кода
// иСПОЛЬЗОВАТЬ НАДО С actions созданные через createAction
// const heroes = createReducer(initialState, builder => {
//     builder
//         .addCase(heroesFetching, state => { 
//             state.heroesLoadingStatus = 'loading' // не возвращать - а изменять (чтобы сохранялась иммутабельность)
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroesLoadingStatus = 'idle'
//             state.heroes = action.payload
//         })
//         .addCase(heroesFetchingError, (state) => {
//             state.heroesLoadingStatus = 'error'
//         })
//         .addCase(addHero, (state, action) => {
//             state.heroes.push(action.payload)
//         })
//         .addCase(deleteHero, (state, action) => {
//             state.heroes = state.heroes.filter(item => item.id !== action.payload)
//         })
//         .addDefaultCase(() => {})
// })
 
// export default heroes


// const heroes =  createReducer(initialState , {
//     [heroesFetching]: state => { state.heroesLoadingStatus = 'loading' },
//     [heroesFetched]: (state, action) => {
//         state.heroesLoadingStatus = 'idle'
//         state.heroes = action.payload
//     },
//     [heroesFetchingError]: state => {state.heroesLoadingStatus = 'error'},
//     [addHero]: (state, action) => {state.heroes.push(action.payload)},
//     [deleteHero]: (state, action) => {state.heroes = state.heroes.filter(item => item.id !== action.payload)}
//         },
//     [],
//     state => state
// )


// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle',
              
//             }

//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }

//         case 'HERO_DELETED':
//             return {
//                 ...state, 
//                 heroes: state.heroes.filter(item => item.id !== action.payload)
//             }       
//         case 'HERO_ADDED':
//             return {
//                 ...state, 
//                 heroes: [...state.heroes, action.payload]
//             }

//         default: return state
//     }
// }


