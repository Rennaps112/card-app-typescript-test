import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import SettingsDialog from "./routes/SettingsDialog";
import darkMode from "./utilities/darkMode";
import { EntryProvider } from "./utilities/globalContext";

export default function App() {
  const { isDarkMode, toggleDarkMode } = darkMode();

  return (
    <section>
      <Router>
        <EntryProvider>
          <NavBar isDarkMode={isDarkMode}></NavBar>
          <Routes>
            <Route path="/" element={<AllEntries isDarkMode={isDarkMode} />}></Route>
            <Route path="create" element={<NewEntry isDarkMode={isDarkMode} />}></Route>
            <Route path="edit/:id" element={<EditEntry isDarkMode={isDarkMode} />}></Route>
            <Route
              path="settings"
              element={<SettingsDialog toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />}
            ></Route>
          </Routes>
        </EntryProvider>
      </Router>
    </section>
  );
}
