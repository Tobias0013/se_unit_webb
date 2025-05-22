/* Author(s): Securella */
import React from 'react';
import DeviceList from './DeviceList';
import './RoomCard.css';
import { IDevice } from '../controller/deviceController';

interface RoomCardProps {
  roomName: string;
  devices: IDevice[];
  onToggle: (device: IDevice) => Promise<void>;
  onSetFanSpeed: (device: IDevice, speed: number) => Promise<void>;
  onCommand: (device: IDevice, command: string) => Promise<void>; // <-- NEW
}

const RoomCard: React.FC<RoomCardProps> = ({
  roomName,
  devices,
  onToggle,
  onSetFanSpeed,
  onCommand   // <-- NEW
}) => (
  <div className="room-card">
    <div className="room-header">
      <span className="room-icon">🏠</span>
      <span className="room-name">{roomName}</span>
    </div>
    {/*
      <DeviceList devices={devices} onToggle={onToggle} onSetFanSpeed={onSetFanSpeed} />
    */}
    <DeviceList
      devices={devices}
      onToggle={onToggle}
      onSetFanSpeed={onSetFanSpeed}
      onCommand={onCommand}   // <-- NEW
    />
  </div>
);

export default RoomCard;
