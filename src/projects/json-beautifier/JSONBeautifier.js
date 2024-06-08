import React, { useState } from "react";
import "./JSONBeautifier.css";

const JSONBeautifier = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const beautifyJSON = () => {
    try {
      // Convert single quotes to double quotes
      const doubleQuotedInput = input.replace(/'/g, '"');

      // Parse and beautify the JSON
      const parsed = JSON.parse(doubleQuotedInput);
      const pretty = JSON.stringify(parsed, null, 2);
      setOutput(pretty);
    } catch (error) {
      setOutput("Invalid JSON");
    }
  };

  return (
    <div className="json-beautifier">
      <h1>JSON Beautifier</h1>
      <textarea
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your JSON here..."
      ></textarea>
      <button onClick={beautifyJSON}>Beautify</button>
      <pre className="output">{output}</pre>
    </div>
  );
};

export default JSONBeautifier;
