
import './app.scss';
import { useState } from 'react';

import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';


const App = () => {


    
    return (
        <main className="app">
            <div className="content">
                <HeroesList />
                <div className="content__interactive">
                    <HeroesAddForm />
                    <HeroesFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;