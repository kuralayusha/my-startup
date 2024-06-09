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
import HTMLViewer from "./projects/html-viewer/HTMLViewer";
import JSObfuscator from "./projects/js-obfuscator/JSObfuscator";
import Base64EncoderDecoder from "./projects/base64-encoder-decoder/Base64EncoderDecoder";
import CSSEditor from "./projects/css-editor/CSSEditor";
import RegexTester from "./projects/regex-tester/RegexTester";
import URLDecoderEncoder from "./projects/url-encoder-decoder/URLDecoderEncoder";
import PasswordGenerator from './projects/password-generator/PasswordGenerator';


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
          <Route
            path="/projects/frontend-playground"
            element={<HTMLViewer />}
          />
          <Route path="/projects/js-obfuscator" element={<JSObfuscator />} />
          <Route
            path="/projects/base64-encoder-decoder"
            element={<Base64EncoderDecoder />}
          />
          <Route path="/projects/css-editor" element={<CSSEditor />} />
          <Route path="/projects/regex-tester" element={<RegexTester />} />
          <Route
            path="/projects/url-encoder-decoder"
            element={<URLDecoderEncoder />}
          />
          <Route
            path="/projects/password-generator"
            element={<PasswordGenerator />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
