import React, { useState } from "react";
import "./RegexTester.css";
import { useTranslation } from "react-i18next";

const RegexTester = () => {
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("");
  const [matches, setMatches] = useState([]);

  const handleTest = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const result = [...text.matchAll(regex)];
      setMatches(result);
    } catch (error) {
      setMatches([{ error: t("invalidRegex") }]);
    }
  };

  return (
    <div className="regex-tester">
      <h1 className="regex-tester__heading">{t("regexTester")}</h1>
      <div className="regex-tester__controls">
        <label className="regex-tester__label">
          {t("text")}:
          <textarea
            className="regex-tester__textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("enterText")}
          />
        </label>
        <label className="regex-tester__label">
          {t("pattern")}:
          <input
            type="text"
            className="regex-tester__input"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder={t("enterPattern")}
          />
        </label>
        <label className="regex-tester__label">
          {t("flags")}:
          <input
            type="text"
            className="regex-tester__input"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder={t("enterFlags")}
          />
        </label>
        <button className="regex-tester__button" onClick={handleTest}>
          {t("test")}
        </button>
      </div>
      <div className="regex-tester__results">
        <h2 className="regex-tester__subheading">{t("matches")}</h2>
        {matches.length > 0 ? (
          matches.map((match, index) => (
            <div key={index} className="regex-tester__match">
              {match.error || match[0]}
            </div>
          ))
        ) : (
          <div className="regex-tester__no-match">{t("noMatches")}</div>
        )}
      </div>
    </div>
  );
};

export default RegexTester;
