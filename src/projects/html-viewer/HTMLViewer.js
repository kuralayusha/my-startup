import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "./HTMLViewer.css";

const HTMLViewer = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const iframeRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    // localStorage'dan veri çekme
    const savedData = JSON.parse(localStorage.getItem("html_css_js_storage"));
    if (savedData) {
      setHtml(savedData.html || "");
      setCss(savedData.css || "");
      setJs(savedData.js || "");
    }
  }, []);

  useEffect(() => {
    // Veriyi localStorage'a kaydetme
    const timeout = setTimeout(() => {
      const data = { html, css, js };
      localStorage.setItem("html_css_js_storage", JSON.stringify(data));
    }, 500);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  useEffect(() => {
    // Canlı önizleme güncellemesi
    const timeout = setTimeout(() => {
      const document = iframeRef.current.contentDocument;
      document.open();
      document.write(`
        <style>${css}</style>
        ${html}
        <script>${js}<\/script>
      `);
      document.close();
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="html-viewer">
      {showPopup && <div className="popup">{t("dontWorrySaved")}</div>}
      <div className="editor">
        <textarea
          className="html-input"
          placeholder="HTML"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
        <textarea
          className="css-input"
          placeholder="CSS"
          value={css}
          onChange={(e) => setCss(e.target.value)}
        />
        <textarea
          className="js-input"
          placeholder="JavaScript"
          value={js}
          onChange={(e) => setJs(e.target.value)}
        />
      </div>
      <div className="preview">
        <iframe title="preview" ref={iframeRef} />
      </div>
    </div>
  );
};

export default HTMLViewer;
