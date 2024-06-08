import React from "react";
import { useTranslation } from "react-i18next";
import "./Projects.css";

const Projects = () => {
  const { t } = useTranslation();

  return (
    <div className="projects">
      <h1>{t("ourProjects")}</h1>
      {/* Project cards will be added here */}
    </div>
  );
};

export default Projects;
