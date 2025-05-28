/* Author(s): Securella */
import React from 'react';
import { IDevice } from '../controller/deviceController';
import DeviceCard from './DeviceCard';

interface DeviceListProps {
  devices: IDevice[] | null; // Allow null to handle missing data
  onToggle: (device: IDevice) => Promise<void>;
  onSetFanSpeed: (device: IDevice, speed: number) => Promise<void>;
  onCommand: (device: IDevice, command: string) => Promise<void>;
  brewingState: Record<string,boolean>;
  audioRefs: Record<string,HTMLAudioElement>;
}

/**
 * Renders list of devices via DeviceCard.
 * If devices array is null / empty, displays a fallback message.
 */
const DeviceList: React.FC<DeviceListProps> = ({ devices, onToggle, onSetFanSpeed, onCommand, brewingState, audioRefs }) => {
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
          onCommand={onCommand}
          brewingState={brewingState}
          audioRefs={audioRefs}
        />
      ))}
    </div>
  );
};

export default DeviceList;
