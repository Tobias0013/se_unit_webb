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
}

const RoomCard: React.FC<RoomCardProps> = ({ roomName, devices, onToggle, onSetFanSpeed }) => (
  <div className="room-card">
    <div className="room-header">
      <span className="room-icon">🏠</span>
      <span className="room-name">{roomName}</span>
    </div>
    <DeviceList devices={devices} onToggle={onToggle} onSetFanSpeed={onSetFanSpeed} />
  </div>
);

export default RoomCard;
