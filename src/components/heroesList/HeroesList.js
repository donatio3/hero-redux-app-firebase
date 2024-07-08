import {useDatabase, useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { deleteHero, fetchHeroes, filteredHeroesSelector } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.scss'
import heroes from '../../reducers/heroes';

const HeroesList = () => {
    // 1 cпособ не использовать 
    // const someState = useSelector(state => ({ //будет делать re-render так как это обьект,обьекты никогда не равны 
    //     activeFilter: state.filters.activeFilter,
    //     heroes: state.heroes.heroes
    // })) не использовать !!!!

    
    
    // const filteredHeroes = useSelector(state => {   // добовляем heroes/filters 
    //     if (state.filters.filteredHeroes === 'all') {
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter(elem => elem.element === state.filters.filterChooseActive) 
    //     }
        
    // })

    const filteredHeroes = useSelector(filteredHeroesSelector)
    console.log(filteredHeroes, 'selector')
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const {deleteHeroFromDatabase} = useDatabase()

    useEffect(() => {
        dispatch(fetchHeroes());
    }, []);


    const removeHero = useCallback( (id) => {
        console.log(id, 'id')
        // request(`http://localhost:3001/heroes/${id}`, 'DELETE')
        deleteHeroFromDatabase(id)
        .then(data => dispatch(deleteHero(id)))
    }) 

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    
    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }


        return arr.map(({id, ...props}) => {
            
            return (

                <HeroesListItem removeHero={() => removeHero(id)} key={id} {...props}/>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;

















