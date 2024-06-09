import React, { useState } from 'react';
import './PasswordGenerator.css';
import { useTranslation } from 'react-i18next';

const PasswordGenerator = () => {
  const { t } = useTranslation();
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    let characters = lower;

    if (includeUppercase) characters += upper;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    setPassword(generatedPassword);
  };

  return (
    <div className="password-generator">
      <h1>{t('passwordGenerator')}</h1>
      <div className="controls">
        <label>
          {t('length')}:
          <input
            type="number"
            min="1"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          {t('includeUppercase')}
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          {t('includeNumbers')}
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          {t('includeSymbols')}
        </label>
        <button onClick={generatePassword}>{t('generate')}</button>
      </div>
      <div className="output">
        <label>
          {t('password')}:
          <input
            type="text"
            readOnly
            value={password}
            placeholder={t('passwordHere')}
          />
        </label>
        <button onClick={() => navigator.clipboard.writeText(password)}>{t('copy')}</button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
