import React, { useState } from 'react';
import '../Styling/Main.css'

const Main = () => {
  const [degree, setDegree] = useState('');
  const [scale, setScale] = useState('Celsius');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleInput = (e) => {
    setDegree(e.target.value);
    setError("")
    setResult('');
  };

  const handleScaleChange = (e) => {
    setScale(e.target.value);
    setError("")
    setResult('');
  };

  const convertToCelsius = () => {
    if (!degree || isNaN(degree)) {
      setError('Please enter a valid number');
      setResult('');
      return;
    }

    const inputTemperature = parseFloat(degree);

    if (scale === 'Celsius') {
      setResult(`${inputTemperature}°C is equal to ${(inputTemperature).toFixed(2)}°C`);
    } else {
      setResult(`${inputTemperature}°F is equal to ${(((inputTemperature - 32) * 5) / 9).toFixed(2)}°C`);
    }
  };

  const convertToFahrenheit = () => {
    if (!degree || isNaN(degree)) {
      setError('Please enter a valid number');
      setResult('');
      return;
    }

    const inputTemperature = parseFloat(degree);

    if (scale === 'Fahrenheit') {
      setResult(`${inputTemperature}°F is equal to ${(inputTemperature).toFixed(2)}°F`);
    } else {
      setResult(`${inputTemperature}°C is equal to ${((inputTemperature * 9 / 5) + 32).toFixed(2)}°F`);
    }
  };

  return (
    <div className="converter">
      <h2 className='gradient-text'>Temperature Converter</h2>
      <div className="input-container">
        <div className='degree-input-container'>
          <div class="input-group">
            <label class="input-group__label">Degrees</label>
            <input
              id="myInput" class="input-group__input" type="text"
              placeholder="Enter temperature"
              value={degree}
              onChange={handleInput} />
          </div>
        </div>
        <div className='degree-type-container'>
          <label class="input-group__label">Type</label>
          <select class="input-group__input" value={scale} onChange={handleScaleChange}>
            <option className='degree-scale' value="Celsius">Celsius</option>
            <option className='degree-scale' value="Fahrenheit">Fahrenheit</option>
          </select>
        </div>
      </div>
      <div className="button-container">
        <button onClick={convertToCelsius}>Convert to Celsius</button>
        <button onClick={convertToFahrenheit}>Convert to Fahrenheit</button>
      </div>
      <div className="result">
        {error && <p className="error">{error}</p>}
        {result && <p className="conversion-result input-group__input">{result}</p>}
      </div>
    </div>
  );
}

export default Main
