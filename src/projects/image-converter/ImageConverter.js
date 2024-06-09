import React, { useState } from "react";
import "./ImageConverter.css";
import { useTranslation } from "react-i18next";

const ImageConverter = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState("jpeg");
  const [resolution, setResolution] = useState("1080p");
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
  const [convertedFile, setConvertedFile] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");

  const resolutions = {
    "480p": { width: 720, height: 480 },
    "720p": { width: 1280, height: 720 },
    "1080p": { width: 1920, height: 1080 },
    "1440p": { width: 2560, height: 1440 },
    "2160p": { width: 3840, height: 2160 },
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setWarningMessage("");
  };

  const handleConvert = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let { width: targetWidth, height: targetHeight } =
          resolutions[resolution];

        if (keepAspectRatio) {
          const aspectRatio = img.width / img.height;
          if (targetWidth / aspectRatio <= targetHeight) {
            targetHeight = targetWidth / aspectRatio;
          } else {
            targetWidth = targetHeight * aspectRatio;
          }
        }

        if (img.width < targetWidth || img.height < targetHeight) {
          setWarningMessage(t("warningLowResolution"));
        }

        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        const dataUrl = canvas.toDataURL(`image/${outputFormat}`);
        setConvertedFile(dataUrl);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!convertedFile) return;

    const a = document.createElement("a");
    a.href = convertedFile;
    a.download = `converted.${outputFormat}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="image-converter">
      <h1>{t("imageConverter")}</h1>
      <div className="image-converter__controls">
        <input type="file" onChange={handleFileChange} />
        <label>
          {t("resolution")}:
          <select
            value={resolution}
            onChange={(e) => setResolution(e.target.value)}
          >
            <option value="480p">480p</option>
            <option value="720p">720p</option>
            <option value="1080p">1080p</option>
            <option value="1440p">1440p</option>
            <option value="2160p">2160p</option>
          </select>
        </label>
        <label>
          <input
            type="checkbox"
            checked={keepAspectRatio}
            onChange={(e) => setKeepAspectRatio(e.target.checked)}
          />
          {t("keepAspectRatio")}
        </label>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
        >
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WEBP</option>
          <option value="bmp">BMP</option>
          <option value="gif">GIF</option>
        </select>
        <button onClick={handleConvert}>{t("convert")}</button>
        {warningMessage && (
          <p className="image-converter__warning">{warningMessage}</p>
        )}
      </div>
      {convertedFile && (
        <div className="image-converter__output">
          <h2>{t("convertedImage")}</h2>
          <img src={convertedFile} alt="Converted" />
          <button onClick={handleDownload}>{t("download")}</button>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
