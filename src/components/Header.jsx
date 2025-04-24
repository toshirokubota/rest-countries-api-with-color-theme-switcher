import {useState, useEffect} from 'react';

export default function Header() {
    const themeKey = 'mytheme';
    const [theme, setTheme] = useState(()=> {
        return localStorage.getItem(themeKey) || 'light';
    });

    useEffect(()=> {
        //console.log('setting the theme attribute to = ', theme);
        if(theme === 'light' || theme === 'dark') {
            const body = document.querySelector('body');
            body.setAttribute('data-theme', theme);
            localStorage.setItem(themeKey, theme);
        }
    }, [theme]);

    function themeToggle() {
        setTheme(theme === 'light' ? 'dark': 'light');
    }

    return (
        <header>
            <h1 className='font-headerS'>Where in the world</h1>
            <div className='theme-toggler-wrapper'>
                {theme === 'light' && <i className="fa fa-moon"></i>}
                {theme === 'dark' && <i className="fa fa-sun"></i>}
                <button onClick={themeToggle}>
                    {theme === 'light' ? 'Dark Mode': 'Light Mode'}
                </button>
            </div>
        </header>
    )
}