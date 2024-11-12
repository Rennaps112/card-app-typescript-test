import {NavLink} from 'react-router-dom'
import darkMode from '../utilities/darkMode'

interface SettingsProperties {
  isDarkMode: boolean;
}

export default function NavBar({ isDarkMode }: SettingsProperties){


    return(
      <nav className="flex justify-center px-5 py-5">
        <div className="flex justify-center gap-5 flex-grow ml-32">
          <NavLink className={`m-3 p-4 text-xl rounded-md font-medium text-white ${
            isDarkMode ? 'bg-gray-800 hover:bg-slate-600': 'bg-blue-400 hover:bg-blue-500'
            }`}to={'/'}>All Entries</NavLink>
          <NavLink className={`m-3 p-4 text-xl rounded-md font-medium text-white ${
            isDarkMode ? 'bg-gray-800 hover:bg-slate-600': 'bg-blue-400 hover:bg-blue-500'
            }`} to={'/create'}>New Entry</NavLink>
        </div>
        <NavLink className={`m-3 p-4 text-xl rounded-md font-medium text-white ${
            isDarkMode ? 'bg-gray-800 hover:bg-slate-600': 'bg-blue-400 hover:bg-blue-500'
            }`} to={'/settings'}>Settings</NavLink>
      </nav>
      
    )
}