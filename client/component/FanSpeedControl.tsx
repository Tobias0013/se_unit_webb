/* Author(s): Securella */
import React from 'react';
import './FanSpeedControl.css';

interface FanSpeedControlProps {
  value: number;
  onChange: (speed: number) => void;
}

const FanSpeedControl: React.FC<FanSpeedControlProps> = ({ value, onChange }) => (
  <div className="fan-speed-control">
    <input
      type="range"
      min={0}
      max={5}
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value, 10))}
    />
    <span className="speed-value">{value}</span>
  </div>
);

export default FanSpeedControl;
