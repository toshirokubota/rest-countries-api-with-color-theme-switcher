import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CountryContext } from "../App"

export default function CountryDetail() {
    const { countries } = useContext(CountryContext);
    const [ country, setCountry] = useState(null);
    const { name } = useParams();
    const navigate = useNavigate();
    //const location = useLocation()
    //console.log('CountryDetail: location = ', location);

    const formatter = new Intl.NumberFormat(navigator.language);

    useEffect(() => {
        const str = name.toLowerCase();
        const obj = countries.find(country => 
            country.name.common.toLowerCase() === str ||
            country.name.official.toLowerCase() === str);
        if(obj) {
            setCountry(obj);
        }
    }, [countries, name]);

    function currencyName(country) {
        return country && country.currencies ? 
            Object.entries(country.currencies)[0][1].name: 
            'NA';
    }
    function languageList(country) {
        if(country && country.languages) {
            let str = '';
            for(let lang of Object.entries(country.languages)) {
                str += lang[1] + ', ';
            }
            return str.slice(0, str.length - 2); //get rid of the last comma
        }
        return 'NA';
    }
    function nativeNames(country) {
        if(country && country.name && country.name.nativeName) {
            let str = '';
            for(let name of Object.entries(country.name.nativeName)) {
                str += name[1].common + ', ';
            }
            return str.slice(0, str.length - 2); //get rid of the last comma
        }
        return 'NA';
    }
    function neighborContryLinks(country) {
        if(country && country.borders) {
            const neighbors = country.borders.map(border =>
                countries.find(c => c.cca3 === border));
            const links = [];
            for(let n of neighbors) {
                if(n) {
                links.push(<Link 
                    className='shadow-box'
                    key={n.name.common} to={`../${n.name.common}`}>{n.name.common}</Link>);
                }
            }
            //console.log(neighbors);
            return links;
        }
        return null;
    }

    //console.log('CountryDetail: ', country);

    return (
        <section>
            <button className='back-button shadow-box' onClick={()=>navigate(-1)}>
                <i className="fa-solid fa-arrow-left"></i>
                Back
            </button>
            {/* <h1>In country detail page {country ? country.name.common: 'undefined'}</h1> */}
            { country &&
                <div className='country-detail-container'>
                    <img src={country.flags.png} alt={country.name.common} className='flag-image'/>
                    <article>
                        <h2 className="font-headerS">{country.name.common}</h2>
                        <div className='country-info'> 
                            <div className='country-primary-info'>
                                <p className="font-bodyS">
                                    <span className="font-semibold">Native Name: </span>
                                    <span className="font-light">{nativeNames(country)}</span>
                                </p>
                                <p className="font-bodyS">
                                    <span className="font-semibold">Population: </span>
                                    <span className="font-light">{formatter.format(Number(country.population))}</span>
                                </p>
                                <p className="font-bodyS">
                                    <span className="font-semibold">Region: </span>
                                    <span className="font-light">{country.region}</span>
                                </p>
                                <p className="font-bodyS">
                                    <span className="font-semibold">Sub Region: </span>
                                    <span className="font-light">{country.subregion}</span>
                                </p>
                                <p className="font-bodyS">
                                    <span className="font-semibold">Capital: </span>
                                    <span className="font-light">{country.capital}</span>
                                </p>
                            </div>
                            <div className='country-secondary-info'>
                            <p className="font-bodyS">
                                <span className="font-semibold">Top Level Domain: </span>
                                <span className="font-light">{country.tld.join(',')}</span>
                            </p>
                            <p className="font-bodyS">
                                <span className="font-semibold">Currencies: </span>
                                <span className="font-light">{currencyName(country)}</span>
                            </p>
                            <p className="font-bodyS">
                                <span className="font-semibold">Languages: </span>
                                <span className="font-light">{languageList(country)}</span>
                            </p>
                            </div>
                        </div>
                        <div className='border-country-card'>
                            <div className="font-bodyS">
                                <span className="font-semibold">Border Countries: </span>
                                    <div className="border-country-list">
                                        {neighborContryLinks(country)}
                                    </div>
                            </div>
                        </div>
                    </article>
                </div>
            }
        </section>
    )
}