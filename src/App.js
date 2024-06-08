import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Supporters from "./pages/Supporters";
import SupportButton from "./components/SupportButton";

// Projects
import JSONBeautifier from "./projects/json-beautifier/JSONBeautifier";

const App = () => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.body.classList.toggle("dark-mode", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Router>
      <div className="App">
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <SupportButton />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/supporters" element={<Supporters />} />
          {/* Projects */}
          <Route
            path="/projects/json-beautifier"
            element={<JSONBeautifier />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
