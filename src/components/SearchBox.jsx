
import { useNavigate } from 'react-router-dom';

export default function SearchBox({setter}) {
    const navigate = useNavigate();

    function handleKeydown(event) {
        if(event.key == "Enter") {
            //console.log(event.target.value.trim());
            const searchStr = event.target.value.trim();
            navigate(`/?name=${searchStr}`)
        }
    }
    

    return (
        <div className='country-search-box shadow-box'>
            <i className="fa fa-magnifying-glass"></i>
            <input 
                type='text' name='search' id='search-box' 
                placeholder="Search for a country"
                onKeyDown={handleKeydown}/>
        </div>
    )
}