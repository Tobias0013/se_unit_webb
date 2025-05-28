/* Author(s): Securella (updated) */
import React, { useCallback } from 'react';
import { toast } from "react-toastify";
import { IDevice } from '../controller/deviceController';

interface DeviceCardProps {
  device: IDevice | null;
  onToggle: (device: IDevice) => Promise<void>;
  onSetFanSpeed: (device: IDevice, speed: number) => Promise<void>;
  onCommand: (device: IDevice, command: string) => Promise<void>;
  brewingState: Record<string,boolean>;
  audioRefs: Record<string,HTMLAudioElement>;
}

/**
 * Renders single device card with correct controls for its type.
 */
const DeviceCard: React.FC<DeviceCardProps> = ({
  device,
  onToggle,
  onSetFanSpeed,
  onCommand,
  brewingState,
  audioRefs
}) => {
  if (!device) {
    return (
      <div className="device-card error">
        <p>Device data is unavailable.</p>
      </div>
    );
  }

  const { name, type, status, value } = device;

  // A little icon + label for each type
  const typeLabel = (() => {
    switch (type) {
      case 'light':           return '💡 Light';
      case 'fan':             return '🌀 Fan';
      case 'sensor':          return '🌡 Sensor';
      case 'buzzer':          return '🔔 Buzzer';
      case 'coffee_machine':  return '☕ Coffee';
      case 'mediaplayer':     return '🎵 Media Player';
      default:                return type;
    }
  })();

  // All on/off toggles (light + fan)
  const handleToggleClick = useCallback(async () => {
    try {
      await onToggle(device);
    } catch (err) {
      console.error('Error toggling device:', err);
      toast.error("Failed to toggle device");
    }
  }, [device, onToggle]);

  // Fan speed slider
  const handleFanSpeedChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const speed = parseInt(e.target.value, 10);
        await onSetFanSpeed(device, speed);
      } catch (err) {
        console.error('Error setting fan speed:', err);
        toast.error("Failed to set fan speed");
      }
    },
    [device, onSetFanSpeed]
  );

  // Helper to fire arbitrary commands (buzzer, coffee, media)
  const makeCommandHandler = (cmd: string) => () =>
    onCommand(device, cmd).catch(err => {
      console.error('Error sending command:', err);
      toast.error("Command failed");
    });

  return (
    <div className="device-card">
      {/* Show full name, or fallback */}
      <h3 className="device-name">{`${device.room} ${device.name}`}</h3>
      <p className="device-type">{typeLabel}</p>

      {/* Light & Fan on/off */}
      {(type === 'light' || type === 'fan') && (
        <button className="toggle-btn" onClick={handleToggleClick}>
          {status ? 'Turn Off' : 'Turn On'}
        </button>
      )}

      {/* Fan speed */}
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
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            {value ?? 0}
          </span>
        </div>
      )}

      {/* Sensor reading */}
      {type === 'sensor' && (
        <p className="sensor-value">
          Temperature:&nbsp;
          {value !== undefined ? `${value}°C` : '--'}
        </p>
      )}

      {/* Buzzer */}
      {type === 'buzzer' && (
        <button className="toggle-btn" onClick={() => onCommand(device, 'ring')}>
          Ring
        </button>
      )}

      {/* Coffee Machine */}
      {type === 'coffee_machine' && (
        <button className="toggle-btn" onClick={() => onCommand(device, 'brew')}>
          Brew Coffee
        </button>
      )}

      {/* Media Player controls */}
      {type === 'mediaplayer' && (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => onCommand(device, 'prev')}>⏮</button>
          <button onClick={() => onCommand(device, 'play')}>▶️</button>
          <button onClick={() => onCommand(device, 'next')}>⏭</button>
        </div>
      )}
    </div>
  );
};

export default DeviceCard;
