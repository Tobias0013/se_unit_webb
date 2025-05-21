/* Author(s): Securella */
import React from 'react';
import { IDevice } from '../controller/deviceController';
import DeviceCard from './DeviceCard';

interface DeviceListProps {
  devices: IDevice[] | null; // Allow null to handle missing data
  onToggle: (device: IDevice) => Promise<void>;
  onSetFanSpeed: (device: IDevice, speed: number) => Promise<void>;
}

/**
 * Renders list of devices via DeviceCard.
 * If devices array is null / empty, displays a fallback message.
 */
const DeviceList: React.FC<DeviceListProps> = ({ devices, onToggle, onSetFanSpeed }) => {
  if (!devices) {
    return <div className="device-list error">No device data available.</div>;
  }

  if (devices.length === 0) {
    return <div className="device-list empty">No devices found.</div>;
  }

  return (
    <div className="device-list">
      {devices.map((device) => (
        <DeviceCard
          key={device.id}
          device={device}
          onToggle={onToggle}
          onSetFanSpeed={onSetFanSpeed}
        />
      ))}
    </div>
  );
};

export default DeviceList;
