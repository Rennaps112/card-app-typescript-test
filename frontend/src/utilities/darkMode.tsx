import { useState, useEffect } from 'react';

/*Hook for Dark mode*/
const darkMode = () => {
    const [isDarkMode, setDarkMode] = useState(false);
    
    
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
          setDarkMode(true);
        }
      }, []);
    
    useEffect(() => {
        if (isDarkMode) {
          document.body.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.body.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      }, [isDarkMode]);
    

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
      };
    
    return { isDarkMode, toggleDarkMode };
};
    
export default darkMode;