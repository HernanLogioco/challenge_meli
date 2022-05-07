import React, { useState } from 'react';
import './App.scss';
import {Routes, Route, useNavigate, Navigate } from 'react-router-dom';


//Import ==> Components
 import {SearchBox} from "./SearchBox/SearchBox";
 import Loader from './Loader/Loader';
 import ItemsList from "./ItemsList/ItemsList";
 import ItemDetail from "./ItemDetail/ItemDetail";
 import Message from "./Message/Message";


function App() {
  let navigate = useNavigate();

  //save results
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  //Get results - SearchBox + control loading logo
  const getResults = (query) => {
    setLoading(true);
    fetch(`http://localhost:8080/api/items?q=${query}`)
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                console.error(response);
                setLoading(false);
                setResults({error: response});
            } else {
                setLoading(false);
                setResults(response);
                //Change path on browser from => /api/items?q= to /items?search=
                navigate(`/items?search=${query}`);
            }
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
            setResults({error: 'Error Api Connection'});
        });
  };

  return (
    <div className="App">
      {
        loading ? <Loader /> : 

        <Routes>
          <Route path="/" element={<SearchBox onSubmit={(query) => getResults(query)}/>} />

          <Route exact path="/items" element={ results.error ?  

            <Message error={true} message={'Ups! Surgió un inconveniente buscando ese producto. Intenta nuevamente, más tarde.'}/> :

            results.products ? results.products.length ? 
            <React.Fragment>
              <SearchBox onSubmit={(query) => getResults(query)}/> 
              <ItemsList categories={results.categories} products={results.products}/> 
            </React.Fragment> 
            :
            <React.Fragment>
              <SearchBox onSubmit={(query) => getResults(query)}/>
              <Message error={false} message={"No hay publicaciones que coincidan con tu búsqueda. Por favor revisá la ortografía o Intentá ingresar una nueva palabra."}/>
            </React.Fragment>
            :
            <Navigate to={`/`}></Navigate>} 
          />
          
          <Route path="/items/:id" element={ <React.Fragment><SearchBox onSubmit={(query) => getResults(query)}/><ItemDetail/></React.Fragment>} />
        </Routes>

      }
    </div>
  );

}

export default App;
