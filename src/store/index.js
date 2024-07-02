import { configureStore } from '@reduxjs/toolkit';
import filters from '../reducers/filters';
// import heroes from '../reducers/heroes';

// import filters from '../components/heroesFilters/filtersSlice'
import heroes from '../components/heroesList/heroesSlice'
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { getDefaultNormalizer } from '@testing-library/react';

// middleWare - это f по добавлянию функционалу и изммненеию работы Dispatch 
// (в качестве action может быть любой тип)


// В 1 аргум. - store есть только dispatch & getState 
const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}


const enhancer = (createStore) => (...args) => {
    const store = createStore(...args)

    const oldDispatch = store.dispatch  // здесь хранится оригинальный dispatch
    store.dispatch = (action) => { // меняем dispatch напрямую
        if (typeof action === 'number') {
            return oldDispatch({ // возвращаем оригинальный dispatch
                type: action    // cтрочка будет передана 
            })
        }
        return oldDispatch(action)
    }
    return store;
}


const store = configureStore({
    reducer: {filters, heroes},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',  // при product. - false
})


export default store;

// combine reducer - разделяет reducers передавать нужно в виде обьекта 
// compose - дает возможность обьеденять в createStore enhanser и т д 
// 1 СТАВЯТ enhancers а потом уже devTools
// enhancer вставляется 2 аргум. в createStore для усиления store - она подменит ориг dispatch

// const store = createStore( 
//                     combineReducers({heroes, filters}),
//                     compose(
//                         applyMiddleware(thunk, stringMiddleware), 
//                             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                             ) 
//                     // compose(
//                     //     enhancer,
//                     //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                     // )
//                 )  



// const mapStateToProps = (dispatch) => {
//     return {inc, dec, rnd} = bindActionCreators()

//     const bindActionCreators = (action, dispatch) => (...args) => {
//         if (typeof action === 'object') {
//             let actions = {}
//             for (let key in action) {
//                 actions[key] = dispatch(action[key](...args))
//             }
//         }
//         return dispatch(action(...args))
//     }
// }



// export connect(mapStateToProps, mapDispatchToProps)

