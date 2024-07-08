
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from "react";
import { useDatabase, useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import classNames from 'classnames';

import { fetchFilters, filterActive} from "../../actions";
// import { filterActive } from "./filtersSlice";

const HeroesFilters = () => {
    const dispatch = useDispatch()
    const {filters, filterChooseActive, filtersLoadingStatus} = useSelector(state => state.filters)
    const {request} = useHttp()
    const {getFilters} = useDatabase()

    useEffect(() => {
        // dispatch(fetchFilters(request))
        dispatch(fetchFilters(getFilters))
    }, [])

    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>
    } else if(filtersLoadingStatus === 'error') {
        return <h2>Ошибка загрузки</h2>
    }

    const renderButtons = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        console.log(filters, 'filters', filterChooseActive, 'active fill')
        return arr.map(({name, className, label}) => {

            const btnClass = classNames('btn', className, {
                'active': name === filterChooseActive
            });
            return <button 
                        key={name} 
                        id={name} 
                        className={btnClass}
                        onClick={() => dispatch(filterActive(name))}
                        >{label}</button>
        })

        // if (filters && filters.length > 0 ) {
        //     return filters.map((elem) => {
        //         const defaultButton = elem.name === filterChooseActive
        //         return <button onClick={() => {
        //             dispatch(heroesFiltred(elem.name))
        //             dispatch(filterActive(elem.name))}
        //         } className={`btn ${elem.className} ${defaultButton && 'active'}`} key={elem.name} value={elem.name}>{elem.label}</button>
        //     })
        // }

    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderButtons(filters)}     
                    </div>
            </div>
        </div>
    )
}

export default HeroesFilters;