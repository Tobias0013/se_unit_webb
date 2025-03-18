import React, { useCallback } from 'react';
import { toast } from "react-toastify";
import { IDevice } from '../controller/deviceController';

interface DeviceCardProps {
  device: IDevice | null;  // Allow null to handle potential missing data
  onToggle: (device: IDevice) => Promise<void>;
  onSetFanSpeed: (device: IDevice, speed: number) => Promise<void>;
}

/**
 * Renders single device card with controls depending on device type (lamp, fan, sensor).
 * Some fallback logic if device data is missing / invalid.
 */
const DeviceCard: React.FC<DeviceCardProps> = ({ device, onToggle, onUpdateFanSpeed }) => {
  // Safeguard: if device is null or missing critical fields, show fallback
  if (!device) {
    return (
      <div className="device-card error">
        <p>Device data is unavailable.</p>
      </div>
    );
  }

  const { id, name, type, status, value } = device;

  // Handler for toggling device on/off
  const handleToggleClick = useCallback(async () => {
    try {
      // Only toggling for lamp/fan
      if (type === 'lamp' || type === 'fan') {
        await onToggle(device);
      }
    } catch (err) {
      console.error('Error toggling device:', err);
      // Could display a toast or error message if needed
      toast.error("Failed to toggle device");
    }
  }, [device, onToggle, type]);

  // Handler for fan speed slider
  const handleFanSpeedChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const speed = parseInt(e.target.value, 10);
        if (type === 'fan') {
          await onUpdateFanSpeed(device, speed);
        }
      } catch (err) {
        console.error('Error setting fan speed:', err);
        // Could display a toast or error message if needed
        toast.error("Failed to set fan speed");
      }
    },
    [device, onUpdateFanSpeed, type]
  );

  return (
    <div className="device-card">
      <h3 className="device-name">{name || 'Unknown Device'}</h3>
      <p className="device-type">{type || 'Unknown Type'}</p>

      {/* Toggle for lamp/fan */}
      {(type === 'lamp' || type === 'fan') && (
        <button className="toggle-btn" onClick={handleToggleClick}>
          {status ? 'Turn Off' : 'Turn On'}
        </button>
      )}

      {/* Fan speed slider */}
      {type === 'fan' && (
        <div className="fan-control">
          <label>Fan Speed:</label>
          <input
            type="range"
            min="0"
            max="5"
            value={value ?? 0}
            onChange={handleFanSpeedChange}
          />
          <span>{value || 0}</span>
        </div>
      )}

      {/* Sensor reading (temperature, whatever.) */}
      {type === 'sensor' && (
        <p className="sensor-value">
          Temperature: {value !== undefined ? `${value}°C` : '--'}
        </p>
      )}
    </div>
  );
};

export default DeviceCard;
