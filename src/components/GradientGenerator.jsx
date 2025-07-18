import React, { useState } from 'react';
import './GradientGenerator.css';
import { FiRefreshCw, FiCopy, FiDownload } from 'react-icons/fi';

const predefinedColors = [
  '#ff7eb9', '#ff65a3', '#7afcff', '#feff9c', '#fff740', '#ffa8B6',
  '#a0ffe6', '#e0aaff', '#9c89b8', '#f0a6ca', '#00f0ff', '#44ffd2'
];

const GradientGenerator = () => {
  const [colors, setColors] = useState(['#667eea', '#764ba2', '#f093fb']);
  const [type, setType] = useState('linear');
  const [angle, setAngle] = useState(135);
  const [opacity, setOpacity] = useState(1);
  const [animation, setAnimation] = useState(false);
  const [blendMode, setBlendMode] = useState('normal');

  const gradientStyle = {
    background: `${type}-gradient(${type === 'linear' ? `${angle}deg` : ''}, ${colors.join(', ')})`,
    opacity: opacity,
    height: '250px',
    borderRadius: '20px',
    transition: '0.4s ease',
    animation: animation ? 'gradientMove 5s ease infinite' : 'none',
    mixBlendMode: blendMode,
  };

  const copyToClipboard = () => {
    const cssCode = `background: ${type}-gradient(${type === 'linear' ? `${angle}deg` : ''}, ${colors.join(', ')});`;
    navigator.clipboard.writeText(cssCode);
    alert('CSS Copied!');
  };

  return (
    <div className="generator-wrapper">
      <div className="header">
        <div>
          <h2>🎨 Background Generator</h2>
          <p>Create beautiful animated gradient backgrounds</p>
        </div>
      </div>

      <div className="content">
        <div className="left">
          {[0, 1, 2].map((index) => (
            <div className="color-picker" key={index}>
              <label>Color {index + 1}</label>
              <div className="swatches">
                {predefinedColors.map((c) => (
                  <button
                    key={c}
                    style={{ background: c }}
                    className={colors[index] === c ? 'active' : ''}
                    onClick={() => {
                      const newColors = [...colors];
                      newColors[index] = c;
                      setColors(newColors);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="controls">
            <label>Gradient Type</label>
            <div className="tabs">
              {['linear', 'radial', 'conic'].map((t) => (
                <button
                  key={t}
                  className={type === t ? 'active' : ''}
                  onClick={() => setType(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {type === 'linear' && (
              <>
                <label>Angle: {angle}°</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                />
              </>
            )}

            <label>Opacity: {Math.floor(opacity * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(e.target.value)}
            />

            <label>Blend Mode</label>
            <select value={blendMode} onChange={(e) => setBlendMode(e.target.value)}>
              {['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten'].map((mode) => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>

            <label>
              <input
                type="checkbox"
                checked={animation}
                onChange={(e) => setAnimation(e.target.checked)}
              />
              Enable Animation
            </label>
          </div>
        </div>

        <div className="right">
          <h4>Live Preview</h4>
          <div className="preview" style={gradientStyle}></div>
          <div className="preview-controls">
            <button onClick={() => window.location.reload()}><FiRefreshCw /></button>
            <button onClick={copyToClipboard}><FiCopy /> Copy</button>
            <button><FiDownload /></button>
          </div>
          <textarea
            readOnly
            value={`background: ${type}-gradient(${type === 'linear' ? `${angle}deg` : ''}, ${colors.join(', ')});`}
          />
        </div>
      </div>
    </div>
  );
};

export default GradientGenerator;
