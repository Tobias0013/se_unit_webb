/* Author(s): Securella */
import React, { useCallback } from 'react';
import { toast } from "react-toastify";
import { IDevice } from '../controller/deviceController';

interface DeviceCardProps {
  device: IDevice | null;  // Allow null to handle potential missing data
  onToggle: (device: IDevice) => Promise<void>;
  onSetFanSpeed: (device: IDevice, speed: number) => Promise<void>;
}

/**
 * Renders single device card with controls depending on device type (light, fan, sensor).
 * Some fallback logic if device data is missing / invalid.
 */
const DeviceCard: React.FC<DeviceCardProps> = ({ device, onToggle, onSetFanSpeed }) => {
  if (!device) {
    return (
      <div className="device-card error">
        <p>Device data is unavailable.</p>
      </div>
    );
  }

  const { id, name, type, status, value } = device;

  const typeLabel = type === 'light' ? '💡 Light' :
                    type === 'fan' ? '🌀 Fan' :
                    type === 'sensor' ? '🌡 Sensor' :
                    type;

  // Handler for toggling device on/off
  const handleToggleClick = useCallback(async () => {
    try {
      if (type === 'light' || type === 'fan') {
        await onToggle(device);
      }
    } catch (err) {
      console.error('Error toggling device:', err);
      toast.error("Failed to toggle device");
    }
  }, [device, onToggle, type]);

  // Handler for fan speed slider
  const handleFanSpeedChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const speed = parseInt(e.target.value, 10);
        if (type === 'fan') {
          await onSetFanSpeed(device, speed);
        }
      } catch (err) {
        console.error('Error setting fan speed:', err);
        toast.error("Failed to set fan speed");
      }
    },
    [device, onSetFanSpeed, type]
  );

  return (
    <div className="device-card">
      <h3 className="device-name">
        {name?.replace(new RegExp(`\\b${type}\\b`, 'i'), '').trim() || 'Unknown Device'}
      </h3>
      <p className="device-type">{typeLabel}</p>

      {(type === 'light' || type === 'fan') && (
        <button className="toggle-btn" onClick={handleToggleClick}>
          {status ? 'Turn Off' : 'Turn On'}
        </button>
      )}

      {type === 'fan' && (
        <div className="fan-control">
          <label>Fan Speed:</label>
          <input
            type="range"
            min="0"
            max="5"
            value={value ?? 0}
            onChange={handleFanSpeedChange}
            style={{ width: '100px', marginLeft: '10px' }}
          />
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{value ?? 0}</span>
        </div>
      )}

      {type === 'sensor' && (
        <p className="sensor-value">Temperature: {value !== undefined ? `${value}°C` : '--'}</p>
      )}
    </div>
  );
};

export default DeviceCard;
