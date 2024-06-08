import React from "react";
import { useTranslation } from "react-i18next";
import "./Home.css";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home">
      <h1>{t("welcome")}</h1>
      <p>{t("description")}</p>
    </div>
  );
};

export default Home;
