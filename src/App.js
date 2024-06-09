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
import PasswordGenerator from "./projects/password-generator/PasswordGenerator";
import ImageConverter from "./projects/image-converter/ImageConverter";

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
        {/* <SupportButton /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Projects />} />
          <Route path="/supporters" element={<Supporters />} />
          {/* Projects */}
          <Route path="/tools/json-beautifier" element={<JSONBeautifier />} />
          <Route path="/tools/frontend-playground" element={<HTMLViewer />} />
          <Route path="/tools/js-obfuscator" element={<JSObfuscator />} />
          <Route
            path="/tools/base64-encoder-decoder"
            element={<Base64EncoderDecoder />}
          />
          <Route path="/tools/css-editor" element={<CSSEditor />} />
          <Route path="/tools/regex-tester" element={<RegexTester />} />
          <Route
            path="/tools/url-encoder-decoder"
            element={<URLDecoderEncoder />}
          />
          <Route
            path="/tools/password-generator"
            element={<PasswordGenerator />}
          />
          <Route path="/tools/image-converter" element={<ImageConverter />} />

          {/* write a code that if there is not a route then send them to home page */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
