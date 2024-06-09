import React, { useState } from "react";
import "./URLDecoderEncoder.css";
import { useTranslation } from "react-i18next";

const URLDecoderEncoder = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const encode = () => {
    setOutput(encodeURIComponent(input));
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (error) {
      setOutput(t("invalidURLEncoded"));
    }
  };

  return (
    <div className="url-encoder-decoder">
      <h1>{t("urlEncoderDecoder")}</h1>
      <div className="controls">
        <label>
          {t("input")}:
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("enterText")}
          />
        </label>
        <button onClick={encode}>{t("encode")}</button>
        <button onClick={decode}>{t("decode")}</button>
      </div>
      <div className="output">
        <label>
          {t("output")}:
          <textarea value={output} readOnly placeholder={t("outputHere")} />
        </label>
      </div>
    </div>
  );
};

export default URLDecoderEncoder;
