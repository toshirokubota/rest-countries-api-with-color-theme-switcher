import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function FilterCountryBox({choice}) {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();

    function clickHandler(event) {
        setOpenMenu(!openMenu);
        navigate(`/region/${event.target.value}`)
    }

    function RegionCard() {
        const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

        return (
            <div className='region-list-box'>
                {
                    regions.map(region => {
                        return (
                            <label key={region} htmlFor={region}>
                                <input type='checkbox' key={region} 
                                    value={region} id={region}
                                    name={region} onChange={clickHandler}
                                    checked={region === choice}
                                    />
                                {region}
                            </label>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className='filter-country-card'>
            <button className='shadow-box font-bodyXS'
                onClick={()=> setOpenMenu(!openMenu)}>
                Filter by Region
                <i className="fa-solid fa-chevron-down"></i>
                {/* <i class="fa-solid fa-chevron-up"></i> */}
                </button>
            {
                openMenu && <RegionCard />
            }
        </div>
    )
}