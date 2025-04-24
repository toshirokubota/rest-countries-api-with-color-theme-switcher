//import { useEffect } from "react";
import { Link } from 'react-router-dom';
export default function CountryCard({country}) {
    const formatter = new Intl.NumberFormat(navigator.language);

    return (
        country ?
            (<div className='country-card'>
                <Link to={`/${country.name.common}`}>
                    {/* <h1>In country detail page {country.name.common}</h1> */}
                    <img src={country.flags.png} alt={country.name.common} className='flag-image'/>
                    <div className='country-summary'>
                        <h2 className="font-headerS">{country.name.common}</h2> 
                        <p className="font-bodyS">
                            <span className="font-semibold">Population: </span>
                            <span className="font-light">{formatter.format(Number(country.population))}</span>
                        </p>
                        <p className="font-bodyS">
                            <span className="font-semibold">Region: </span>
                            <span className="font-light">{country.region}</span>
                        </p>
                        <p className="font-bodyS">
                            <span className="font-semibold">Capital: </span>
                            <span className="font-light">{country.capital}</span>
                        </p>
                    </div>
                </Link>
            </div>):
            <h1>No country data is available</h1>
    )
}