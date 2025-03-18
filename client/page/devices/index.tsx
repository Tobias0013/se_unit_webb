import React, { useEffect, useState } from 'react';
import './style.css';

import {
  fetchDevices,
  toggleDevice,
  updateFanSpeed,
  IDevice,
} from '../../controller/deviceController';

// MAY BE AN OPTION: if we fetch user info for greeting/avatar
// import { fetchCurrentUser, IUser } from '../../controller/userController';

import DeviceList from '../../component/DeviceList';

const DevicesPage: React.FC = () => {
  // Optional User State (currently unused/commented)
  // const [user, setUser] = useState<IUser | null>(null);

  // Devices state
  const [devices, setDevices] = useState<IDevice[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Date/time state
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');

  // Update date/time every minute
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      setDateString(
        now.toLocaleDateString([], {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      );
    };
    updateDateTime(); // initial call
    const intervalId = setInterval(updateDateTime, 60_000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetch devices on component mount
  useEffect(() => {
    const loadDevices = async () => {
      try {
        // Optional user fetch
        // const [userData, deviceData] = await Promise.all([
        //   fetchCurrentUser(),
        //   fetchDevices(),
        // ]);
        // setUser(userData);

        const deviceData = await fetchDevices();
        setDevices(deviceData);
      } catch (err: any) {
        setError(err.message || 'Failed to load data.');
      } finally {
        setLoading(false);
      }
    };
    loadDevices();
  }, []);

  // Handle toggling device status (on/off)
  const handleToggle = async (device: IDevice) => {
    try {
      await toggleDevice(device.id, !device.status);
      setDevices((prev) =>
        prev
          ? prev.map((d) =>
              d.id === device.id ? { ...d, status: !d.status } : d
            )
          : null
      );
    } catch (err: any) {
      setError(err.message || `Failed to toggle device: ${device.name}`);
    }
  };

  // Handle setting fan speed
  const handleSetFanSpeed = async (device: IDevice, speed: number) => {
    try {
      await updateFanSpeed(device.id, speed);
      setDevices((prev) =>
        prev
          ? prev.map((d) =>
              d.id === device.id ? { ...d, value: speed } : d
            )
          : null
      );
    } catch (err: any) {
      setError(err.message || `Failed to set fan speed: ${device.name}`);
    }
  };

  // Loading state display
  if (loading) {
    return (
      <div className="devices-page">
        <p className="loading">Loading devices...</p>
      </div>
    );
  }

  // Error state display
  if (error) {
    return (
      <div className="devices-page error">
        <p>{error}</p>
      </div>
    );
  }

  // Group devices by room/location
  const rooms = devices
    ? Array.from(new Set(devices.map((d) => d.room || 'Other')))
    : [];

  // Optional user initials for avatar (currently unused)
  // const userInitials = user
  //   ? (user.firstName[0] + (user.lastName[0] || '')).toUpperCase()
  //   : 'U';

  return (
    <div className="devices-page">
      {/* Top bar with date/time, user avatar, settings */}
      <header className="top-bar">
        <div className="time-date">
          <span className="time">{timeString}</span>
          <span className="date">{dateString}</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar">U</div> {/* Replace with {userInitials} if implemented */}
          <span className="user-name">User</span>
        </div>
        <button className="settings-btn">Settings</button>
      </header>

      {/* Greeting & Quick Access Scenes (can later integrate with backend scenes/actions) */}
      <section className="greeting-section">
        <h1>Good morning!</h1>
        <div className="quick-access">
          <button>Wake Up</button>
          <button>Chill</button>
          <button>Party</button>
          <button>Good Night</button>
        </div>
      </section>

      {/* Rooms & Devices */}
      <section className="rooms-section">
        <h2>Rooms</h2>
        {rooms.map((room) => {
          const roomDevices = devices?.filter(
            (d) => (d.room || 'Other') === room
          );
          return (
            <div className="room" key={room}>
              <div className="room-header">
                <div className="room-icon">🏠</div>
                <h3 className="room-name">{room}</h3>
              </div>
              <DeviceList
                devices={roomDevices || []}
                onToggle={handleToggle}
                onSetFanSpeed={handleSetFanSpeed}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default DevicesPage;
