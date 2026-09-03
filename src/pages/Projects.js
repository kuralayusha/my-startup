import React, { useState, useEffect } from "react";
import "./Projects.css";
import projectsData from "../data/projects.json"; // Dosya yolunu güncelledik
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Projects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  return (
    <div className="projects">
      <h1 className="projects__title">{t("ourProjects")}</h1>
      <div className="projects__list">
        {projects.map((project) => (
          <Link to={project.link} key={project.id} className="project-card">
            <h2 className="project-card__name">{project.name}</h2>
            <p className="project-card__description">{project.description}</p>
            <div className="project-card__tags">
              {project.filters.map((filter, index) => (
                <span key={index} className="project-card__tag">
                  {filter}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
