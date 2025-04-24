import {createContext, useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
import CountryContainer from './components/CountryContainer'
import CountryDetail from './components/CountryDetail'
const CountryContext = createContext();
export {CountryContext}

import './App.css'
const restcountries_url = 'https://restcountries.com/v3.1/all';

function App() {
  const [countries, setCountries] = useState([]);
  useEffect(()=>{
          fetch(restcountries_url)
          .then(res => {                
              //console.log(res);
              return res.json();
          })
          .then(data => {
              //console.log(data);
              data.sort((a,b) => a.name.common.localeCompare(b.name.common));
              setCountries(data);
          })
          .catch(error => {
            console.error('Fetch Error:', error);
          });
  }, []);

  return (
    <CountryContext.Provider value={{countries}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CountryContainer />} />
          <Route path="/:name" element={<CountryDetail />} />
          <Route path="/region/:name" element={<CountryContainer />} />          
        </Route>
      </Routes>
    </BrowserRouter>
    </CountryContext.Provider>
  )
}

export default App
