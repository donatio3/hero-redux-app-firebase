import { createAsyncThunk, createReducer } from "@reduxjs/toolkit"

import {
    filtersFetching, 
    filtersFetched, 
    filtersFetchingError,
    filterActive
} from '../actions/index'
import { useHttp } from "../hooks/http.hook"

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    filterChooseActive: 'all'
}   

// const filters = createReducer(initialState, {
        
//         [filtersFetching]: (state) => {
//             state.filtersLoadingStatus = 'idle'
//         },    
//         [filtersFetched]: (state, action) => {
//             state.filtersLoadingStatus = 'idle'
//             state.filters = action.payload
//         },  
//         [filtersFetchingError]: (state) => {
//             state.filtersLoadingStatus = 'idle'
//         },
//         [filterActive]: (state, action) => {
//             state.filterChooseActive = action.payload
//         }
// })
    

const filters = createReducer(initialState, builder => {
    builder 
        .addCase(filtersFetching, (state) => {state.filtersLoadingStatus = 'loading'})
        .addCase(filtersFetched, (state, action) => {
            state.filtersLoadingStatus = 'idle'
            state.filters = action.payload
        })
        .addCase(filtersFetchingError, state => {state.filtersLoadingStatus = 'error'})
        .addCase(filterActive, (state, action) => {
            state.filterChooseActive = action.payload
        })
      
        .addDefaultCase(() => {})
})

export default filters;


// const filters = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FILTERS_FETCHING':
//             return {
//                 ...state, 
//                 filtersLoadingStatus: 'loading'
//             }

//         case 'FILTERS_FETCHING_ERROR':
//             return {
//                 ...state, 
//                 filtersLoadingStatus: 'error'
//             }

//         case 'FILTERS_FETCHED':
//             return {
//                 ...state, 
//                 filters: [...action.payload],
//                 filtersLoadingStatus: 'idle'
//             }
//         case 'FILTER_ACTIVE':
//             return {
//                 ...state, 
//                 filterChooseActive: action.payload
//             }
//         case 'HEROES_FILTRED':
//             console.log('filtred', action.payload)
//             return {
//                 ...state,
//                 filterChooseActive: action.payload ,
//                 heroesLoadingStatus: 'idle'
//             }
//         default: return state
//     }
// }

