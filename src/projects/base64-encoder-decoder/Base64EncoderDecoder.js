import React, { useState } from "react";
import "./Base64EncoderDecoder.css";

const Base64EncoderDecoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      setOutput("Invalid input for Base64 encoding");
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (error) {
      setOutput("Invalid input for Base64 decoding");
    }
  };

  return (
    <div className="base64-encoder-decoder">
      <h1>Base64 Encoder/Decoder</h1>
      <textarea
        className="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to encode or decode..."
      ></textarea>
      <div className="buttons">
        <button onClick={encode}>Encode</button>
        <button onClick={decode}>Decode</button>
      </div>
      <textarea
        className="output"
        value={output}
        readOnly
        placeholder="Encoded/Decoded output will appear here..."
      ></textarea>
    </div>
  );
};

export default Base64EncoderDecoder;
