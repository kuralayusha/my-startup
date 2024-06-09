import React, { useState } from "react";
import "./CSSEditor.css";
import { useTranslation } from "react-i18next";

const CSSEditor = () => {
  const { t } = useTranslation();
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [gradientColors, setGradientColors] = useState(["#ffffff"]);
  const [gradientDirection, setGradientDirection] = useState("0deg");
  const [boxShadow, setBoxShadow] = useState({
    hOffset: "0",
    vOffset: "0",
    blur: "0",
    spread: "0",
    color: "#000000",
  });
  const [borderRadius, setBorderRadius] = useState("0");
  const [width, setWidth] = useState("200");
  const [height, setHeight] = useState("200");
  const [showPopup, setShowPopup] = useState(false);

  const addGradientColor = () => {
    setGradientColors([...gradientColors, "#ffffff"]);
  };

  const removeGradientColor = (index) => {
    setGradientColors(gradientColors.filter((_, i) => i !== index));
  };

  const updateGradientColor = (index, color) => {
    const newColors = gradientColors.slice();
    newColors[index] = color;
    setGradientColors(newColors);
  };

  const generateGradient = () => {
    return `linear-gradient(${gradientDirection}, ${gradientColors.join(
      ", "
    )})`;
  };

  const handleBoxShadowChange = (e) => {
    const { name, value } = e.target;
    setBoxShadow({ ...boxShadow, [name]: value });
  };

  const styles = {
    backgroundColor: gradientColors.length > 1 ? "" : backgroundColor,
    backgroundImage: gradientColors.length > 1 ? generateGradient() : "",
    boxShadow: `${boxShadow.hOffset}px ${boxShadow.vOffset}px ${boxShadow.blur}px ${boxShadow.spread}px ${boxShadow.color}`,
    borderRadius: `${borderRadius}px`,
    width: `${width}px`,
    height: `${height}px`,
  };

  const getCode = () => {
    const code = `
      background-color: ${backgroundColor};
      background-image: ${generateGradient()};
      box-shadow: ${boxShadow.hOffset}px ${boxShadow.vOffset}px ${
      boxShadow.blur
    }px ${boxShadow.spread}px ${boxShadow.color};
      border-radius: ${borderRadius}px;
      width: ${width}px;
      height: ${height}px;
    `;
    navigator.clipboard.writeText(code).then(() => {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    });
  };

  return (
    <div className="css-editor">
      <h1>{t("cssEditor")}</h1>
      <div className="controls">
        <label>
          {t("backgroundColor")}:
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </label>
        <label>
          {t("gradientDirection")}:
          <input
            type="text"
            placeholder={t("gradientDirectionPlaceholder")}
            value={gradientDirection}
            onChange={(e) => setGradientDirection(e.target.value)}
          />
        </label>
        <label>
          {t("addGradientColor")}:
          <button onClick={addGradientColor}>{t("addColor")}</button>
        </label>
        {gradientColors.map((color, index) => (
          <div key={index} className="gradient-color">
            <label>
              {t("gradientColor", { index: index + 1 })}:
              <input
                type="color"
                value={color}
                onChange={(e) => updateGradientColor(index, e.target.value)}
              />
            </label>
            <button onClick={() => removeGradientColor(index)}>
              {t("remove")}
            </button>
          </div>
        ))}
        <label>
          {t("boxShadowHorizontal")} (px):
          <input
            type="number"
            name="hOffset"
            value={boxShadow.hOffset}
            onChange={handleBoxShadowChange}
          />
        </label>
        <label>
          {t("boxShadowVertical")} (px):
          <input
            type="number"
            name="vOffset"
            value={boxShadow.vOffset}
            onChange={handleBoxShadowChange}
          />
        </label>
        <label>
          {t("boxShadowBlur")} (px):
          <input
            type="number"
            name="blur"
            value={boxShadow.blur}
            onChange={handleBoxShadowChange}
          />
        </label>
        <label>
          {t("boxShadowSpread")} (px):
          <input
            type="number"
            name="spread"
            value={boxShadow.spread}
            onChange={handleBoxShadowChange}
          />
        </label>
        <label>
          {t("boxShadowColor")}:
          <input
            type="color"
            name="color"
            value={boxShadow.color}
            onChange={handleBoxShadowChange}
          />
        </label>
        <label>
          {t("borderRadius")} (px):
          <input
            type="number"
            value={borderRadius}
            onChange={(e) => setBorderRadius(e.target.value)}
          />
        </label>
        <label>
          {t("width")} (px):
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </label>
        <label>
          {t("height")} (px):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
      </div>
      <button className="get-code" onClick={getCode}>
        {t("getCode")}
      </button>
      <div className="css-preview" style={styles}>
        {t("preview")}
      </div>
      {showPopup && <div className="popup">{t("codeCopied")}</div>}
    </div>
  );
};

export default CSSEditor;
