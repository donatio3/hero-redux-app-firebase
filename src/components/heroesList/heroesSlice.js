import { createSlice, createAsyncThunk, createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook'


// createEntityAdapter возвращает обьект с методами свойствами селекторами
const heroesAdapter = createEntityAdapter()

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

//getInitialState - генерируем началное состояние

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
})
    
export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',     // первое должно cовпадать со срезом/тип действия
    () => {   // работает с асинхроным кодом и return Promise
        const {request} = useHttp();
        return request(`http://localhost:3001/heroes`)

    } 
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,

    reducers: {
        // heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        // heroesFetched: (state, action) => {
        //     state.heroesLoadingStatus = 'idle'
        //     state.heroes = action.payload
        // },
        // heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        addHero: (state, action) => {
            heroesAdapter.addOne(state, action.payload)
            // state.heroes.push(action.payload)
        },
        deleteHero: (state, action) => {
            heroesAdapter.removeOne(state, action.payload)
            // state.heroes = state.heroes.filter(item => item.id !== action.payload)
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchHeroes.pending, state => {
            state.heroesLoadingStatus = 'loading'
        })
        .addCase(fetchHeroes.fulfilled, (state, action) => {
            state.heroesLoadingStatus = 'idle'
            heroesAdapter.setAll(state, action.payload)
            // state.heroes = action.payload
        })
        .addCase(fetchHeroes.rejected, (state) => {
            state.heroesLoadingStatus = 'error'
        })
    }
})

const {actions, reducer} = heroesSlice

export default reducer


// методом диструктиризации - selectAll вытаскивает entities в виде массива из f(x) обьекта - getSelectors  
const {selectAll} = heroesAdapter.getSelectors(state => state.heroes)

export const filteredHeroesSelector = createSelector(  // меморизирует
        (state) => state.filters.filterChooseActive,
        // (state) => state.heroes.heroes
        selectAll,
        (filter, heroes) => {
            if (filter === 'all') {
                console.log(selectAll, 'select ALL')

                return heroes;
            } else {
                return heroes.filter(elem => elem.element === filter) 
            }
        }
)

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    addHero,
    deleteHero
} = actions




