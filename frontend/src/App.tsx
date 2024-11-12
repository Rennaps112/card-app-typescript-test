import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar'
import AllEntries from './routes/AllEntries'
import NewEntry from './routes/NewEntry'
import EditEntry from './routes/EditEntry'
import SettingsDialog from './routes/SettingsDialog'
import darkMode from './utilities/darkMode'
import { EntryProvider } from './utilities/globalContext'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {

  const { isDarkMode, toggleDarkMode } = darkMode();

  return (
    <section>
  <Router>
    <EntryProvider>
    <NavBar isDarkMode={isDarkMode}></NavBar>
      <Routes>
        <Route path="/" element={<AllEntries isDarkMode={isDarkMode}/>}>
        </Route>
        <Route path="create" element={<NewEntry isDarkMode={isDarkMode}/>}>
        </Route>
        <Route path="edit/:id" element={<EditEntry isDarkMode={isDarkMode}/>}>
        </Route>
        <Route path="settings" element={<SettingsDialog toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />}>
        </Route>
      </Routes>
    </EntryProvider>
    </Router>
    
    </section>
    
  );
}
