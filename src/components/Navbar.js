import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Navbar.css";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MicroBoost</div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <a href="/">{t("home")}</a>
        <a href="/projects">{t("projects")}</a>
        <a href="/supporters">{t("supporters")}</a>
        <div className="dropdown">
          <span>{i18n.language === "en" ? "English" : "Türkçe"}</span>
          <div className="dropdown-content">
            <a href="#" onClick={() => handleLanguageChange("en")}>
              English
            </a>
            <a href="#" onClick={() => handleLanguageChange("tr")}>
              Türkçe
            </a>
          </div>
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          {isDarkMode ? t("lightMode") : t("darkMode")}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
