import {useState} from 'react'
import { useNavigate, Link } from "react-router-dom";

interface SettingsProperties {
    toggleDarkMode: () => void;
    isDarkMode: boolean;
  }

export default function SettingsDialog({ toggleDarkMode, isDarkMode }: SettingsProperties){

    return(
        <section>
            <h1 className="text-center font-bold text-2xl m-5">Settings</h1>
            <h2 className="text-center font-semibold text-xl">Current Theme:</h2>
            <div className="flex justify-center items-center">
        <button
          onClick={toggleDarkMode}
          className={`py-3 px-4 rounded-md font-medium text-white ${
            isDarkMode ? 'bg-gray-800 hover:bg-slate-600' : 'bg-blue-400 hover:bg-blue-500'
          }`}
        >
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
        </section>
        
    )





}