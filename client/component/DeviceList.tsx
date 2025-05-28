/* Author(s): Securella */
import React from 'react';
import { IDevice } from '../controller/deviceController';
import DeviceCard from './DeviceCard';

interface DeviceListProps {
  devices: IDevice[] | null;                     // may be null while loading
  onToggle: (device: IDevice) => Promise<void>;
  onSetFanSpeed: (device: IDevice, speed: number) => Promise<void>;
  onCommand: (device: IDevice, command: string) => Promise<void>;
  brewingState: Record<string, boolean>;          // for coffee machines
  audioRefs: Record<string, HTMLAudioElement>;    // for media players
  trackIndex: Record<string, number>;             // current track per device
}

const DeviceList: React.FC<DeviceListProps> = ({
  devices,
  onToggle,
  onSetFanSpeed,
  onCommand,
  brewingState,
  audioRefs,
  trackIndex
}) => {
  if (devices === null) {
    return <div className="device-list error">No device data available.</div>;
  }
  if (devices.length === 0) {
    return <div className="device-list empty">No devices found.</div>;
  }

  return (
    <div className="device-list">
      {devices.map(device => (
        <DeviceCard
          key={device.id}
          device={device}
          onToggle={onToggle}
          onSetFanSpeed={onSetFanSpeed}
          onCommand={onCommand}
          brewingState={brewingState}
          audioRefs={audioRefs}
          trackIndex={trackIndex}
        />
      ))}
    </div>
  );
};

export default DeviceList;
