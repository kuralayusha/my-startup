import React from "react";
import { Link } from "react-router-dom";
import JSONBeautifier from "../projects/json-beautifier/JSONBeautifier";
import "./Projects.css";

const Projects = () => {
  return (
    <div className="projects">
      <h1>Our Projects</h1>
      <div className="project-list">
        <Link to="/projects/json-beautifier">
          <div className="project-card">
            <h2>JSON Beautifier</h2>
            <p>Format and beautify your JSON data.</p>
          </div>
        </Link>
        {/* Diğer projeler burada listelenecek */}
      </div>
    </div>
  );
};

export default Projects;
