import React, {useState} from 'react';
import {Link} from 'react-router-dom';

//Import ==> Components
import './SearchBox.scss';
import logo from '../assets/meli-logo.png';

export function SearchBox(props) {

    const [searchValue, setSearchValue] = useState('');

    const captureEventSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(searchValue);
    };
    
    return <div className="background-banner">
        <form className="searchBox-container" onSubmit={(event) => captureEventSubmit(event)}>
            <Link to={'/'}>
                <img src={logo} alt="Logo Mercado Libre" />
            </Link>
            <input className="searchBox-input" type="text" placeholder="Buscar productos, marcas y más..."
                   onKeyUp={(event) => setSearchValue(event.target.value)}/>
            <button type="submit" className="searchBox-btn" data-testid="searchBox-icon"/>
        </form>
    </div>;
}