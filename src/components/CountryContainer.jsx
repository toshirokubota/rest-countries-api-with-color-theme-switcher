import { useState, useEffect, useContext } from "react";
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import CountryCard from "./CountryCard";
import SearchBox from "./SearchBox";
import FilterCountryBox from './FilterCountryBox';

import { CountryContext } from "../App";

export default function CountryContainer() {
    const initialChoices = ['Germany', 'United States of America', 'Brazil', 'Iceland', 
        'Afghanistan', 'Åland Islands', 'Albania', 'Algeria'];
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [searchString, setSearchString] = useState('');
    const {countries} = useContext(CountryContext);
    const location = useLocation();
    const region = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    //console.log('CountryContainer: ', location, region, searchParams, countries);

    useEffect(() => {
        console.log('CountryContainer: inside 1st useEffect().', 
            countries.length, location, region, searchParams);
        let countryObjs = [];
        if(location.pathname.startsWith('/region')) {
            //at /region/<region-name> URL. 
            countryObjs = countries.filter(
                country => country.region === region.name
            );
        }
        else {
            //use search params to get countries 
            let name = searchParams.get('name');
            if(name) name = name.toLowerCase();
            countryObjs = countries.filter(
                country => 
                    country.name.common?.toLowerCase().includes(name) ||
                    country.name.official?.toLowerCase().includes(name) ||
                    country.cca3?.toLowerCase()===name ||
                    country.alpha3Code?.toLowerCase() === name
            );
        }
        //if all failed to get countries, use the preselected set of countries
        if(countryObjs.length === 0) {
            for(let name of initialChoices) {
                let obj = countries.find(country => 
                    country.name.common === name || country.name.official === name);
                if(obj) {
                    countryObjs.push(obj);
                }
            }
        }
        setSelectedCountries(countryObjs);
    }, [countries, region, searchParams]);

    //console.log(countries.length, selectedCountries, searchString);
    return (
        <div className='country-container'>
            <div className='country-search-nav'>
                <SearchBox setter={setSearchString}/>
                <FilterCountryBox choice={region.name} />
            </div>
            <div className='country-cards-container'>
            {
                selectedCountries.map(obj => 
                    obj ? <CountryCard key={obj.name.official} country={obj}/>: null           
                )
            }
            </div>
        </div>
    )
}