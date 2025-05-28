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
  brewingState: Record<string,boolean>; // <-- NEW, for coffee
  audioRefs: Record<string,HTMLAudioElement>; // <-- NEW, for mediaplayer
}

const RoomCard: React.FC<RoomCardProps> = ({
  roomName,
  devices,
  onToggle,
  onSetFanSpeed,
  onCommand,   // <-- NEW
  brewingState,
  audioRefs
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
      brewingState={brewingState} // <-- NEW
      audioRefs={audioRefs} // <-- NEW
    />
  </div>
);

export default RoomCard;
