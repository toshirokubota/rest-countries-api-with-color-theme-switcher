import {useState, useEffect} from 'react';

export default function Header() {
    const themeKey = 'theme';
    const [theme, setTheme] = useState('light');
    useEffect(()=> {
        const item = localStorage.getItem('themeKey');
        if(item) {
            setTheme(item);
        }
    }, []);
    useEffect(()=> {
        const body = document.querySelector('body');
        body.setAttribute('data-theme', theme);
        localStorage.setItem(themeKey, theme);
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