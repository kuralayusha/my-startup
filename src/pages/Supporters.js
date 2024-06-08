import React from "react";
import { useTranslation } from "react-i18next";
import "./Supporters.css";

const Supporters = () => {
  const { t } = useTranslation();

  return (
    <div className="supporters">
      <h1>{t("supporters")}</h1>
      <p>{t("supportersMessage")}</p>
    </div>
  );
};

export default Supporters;
