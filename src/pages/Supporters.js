import React, { useEffect, useState } from "react";
import "./Supporters.css";

const Supporters = () => {
  const [supporters, setSupporters] = useState([]);

  useEffect(() => {
    fetch("/data/supporters.json")
      .then((response) => response.json())
      .then((data) => setSupporters(data));
  }, []);

  return (
    <div className="supporters">
      <h1>Supporters</h1>
      <p>Thank you to the following people for their support:</p>
      <ul className="supporter-list">
        {supporters.map((supporter) => (
          <li key={supporter.id} className="supporter-item">
            {supporter.link ? (
              <a
                href={supporter.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {supporter.name}
              </a>
            ) : (
              <span>{supporter.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Supporters;
