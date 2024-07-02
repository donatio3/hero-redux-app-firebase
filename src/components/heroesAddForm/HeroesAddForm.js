import { addHero } from "../heroesList/heroesSlice";
import { useHttp } from "../../hooks/http.hook";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [element, setElement] = useState()

    const dispatch = useDispatch()
    const {filters, filtersLoadingStatus} = useSelector(state => state.filters)

    const {request} = useHttp()

    const createHero = (e) => {
        e.preventDefault()

        const newHero = {
            id: uuidv4(),
            name,
            description,
            element
        }
        console.log(newHero.id)

        request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHero))
        .then((data) => dispatch(addHero(newHero)))
        .then(data => console.log(data, 'response'))
        .catch(() =>console.log('error'))

        setName('')
        setDescription('')
        setElement('')
    }

    const changeInput = (e, input) => {
        input(e.target.value)
    }
    

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form onSubmit={createHero} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    value={name}
                    onChange={(e) => changeInput(e, setName)}
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    value={description}
                    onChange={(e) => changeInput(e, setDescription)}
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    value={element}
                    onChange={(e) => changeInput(e, setElement)}
                    className="form-select" 
                    id="element" 
                    name="element">
                        <option >Я владею элементом...</option>                        
                        {renderFilters(filters, filtersLoadingStatus)}

                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;