import {useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function FilterCountryBox({choice}) {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();
    const buttonRef = useRef(null);

    useEffect(()=> {
        if(openMenu){
            buttonRef.current.focus();
        }
    }, [openMenu]) 

    function handleKeyDown(event) {
        if(event.key == 'Enter') {
            setOpenMenu(!openMenu);
            navigate(`/region/${event.target.value}`)    
        } else if(event.key == "Escape") {
            setOpenMenu(!openMenu);
        }
    }
    function clickHandler(event) {
        setOpenMenu(!openMenu);
        navigate(`/region/${event.target.value}`)
    }

    function RegionCard() {
        const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

        return (
            <div className='region-list-box' ref={buttonRef}>
            {
                    regions.map(region => {
                        const div = 
                            <label key={region} htmlFor={region}>
                                <input type='checkbox' key={region} 
                                    value={region} id={region}
                                    name={region} onChange={clickHandler}
                                    onKeyDown={handleKeyDown}
                                    checked={region === choice}
                                    />
                                {region}
                            </label>
                        return div;
                    })
            }
            </div>
        )
    }

    return (
        <div className='filter-country-card'>
            <button className='shadow-box font-bodyXS'
                onClick={()=> setOpenMenu(!openMenu)}
                onKeyDown={handleKeyDown}>
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