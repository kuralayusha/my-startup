import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((response) => response.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div className="projects">
      <h1>Our Projects</h1>
      <div className="project-list">
        {projects.map((project) => (
          <Link key={project.id} to={project.link}>
            <div className="project-card">
              <img
                src={project.image}
                alt={project.name}
                className="project-image"
              />
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <div className="filters">
                {project.filters.map((filter) => (
                  <span key={filter} className="filter-tag">
                    {filter}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
