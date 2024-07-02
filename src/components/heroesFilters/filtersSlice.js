import { createReducer, createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { initialState } from "../../reducers";

// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     filterChooseActive: 'all',
// }   

const filtersAdapter = createEntityAdapter()

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    filterChooseActive: 'all',
})

const fetchFilters = createAsyncThunk(
    'filters/fetchFilters', 
    () => {
        const {request} = useHttp
        return request("http://localhost:3001/filters")
    }
)



const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    
    reducers: {
        // filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        // filtersFetched: (state, action) => {
        //     state.filtersLoadingStatus = 'idle'
        //     state.filters = action.payload
        // },
        // filtersFetchingError: state => {state.filtersLoadingStatus = 'error'},
        filterActive: (state, action) => {
            filtersAdapter.setOne(state, action.payload)
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchFilters.pending, (state) => {state.filtersLoadingStatus = 'loading'})
        .addCase(fetchFilters.fulfilled, (state, action) => {
            state.filtersLoadingStatus = 'idle'
            filtersAdapter.setOne(state, action.payload)
        })
        .addCase(fetchFilters.rejected, (state) => {state.filtersLoadingStatus = 'error'})
    }
})

const {actions, reducer} = filtersSlice

const {selectAll} = filtersAdapter.getSelectors(state => state.filters)

export default reducer

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filterActive
} = actions
