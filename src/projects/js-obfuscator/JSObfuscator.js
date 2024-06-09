import React, { useState } from "react";
import JavaScriptObfuscator from "javascript-obfuscator";
import "./JSObfuscator.css";

const JSObfuscator = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const obfuscateCode = () => {
    try {
      const obfuscatedCode =
        JavaScriptObfuscator.obfuscate(input).getObfuscatedCode();
      setOutput(obfuscatedCode);
    } catch (error) {
      setOutput("Invalid JavaScript code");
    }
  };

  return (
    <div className="js-obfuscator">
      <h1>JavaScript Obfuscator</h1>
      <textarea
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your JavaScript code here..."
      ></textarea>
      <button onClick={obfuscateCode}>Obfuscate</button>
      <textarea
        className="output"
        value={output}
        readOnly
        placeholder="Obfuscated code will appear here..."
      ></textarea>
    </div>
  );
};

export default JSObfuscator;
