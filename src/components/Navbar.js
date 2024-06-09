import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ toggleTheme, isDarkMode }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">MicroBoost</div>
      <div className="navbar-menu">
        <Link to="/">{t("home")}</Link>
        <Link to="/tools">{t("projects")}</Link>
        <Link to="/supporters">{t("supporters")}</Link>
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          value={i18n.language}
        >
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
        <button onClick={toggleTheme}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
