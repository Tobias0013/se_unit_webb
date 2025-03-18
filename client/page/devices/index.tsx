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

/**
 * DevicesPage displays smart devices grouped by room and allows controlling them.
 *
 * @returns {JSX.Element} Rendered devices page.
 *
 * @remarks
 * This page fetches device data from backend and provides toggle and fan speed control.
 */
const DevicesPage: React.FC = () => {
  // Optional User State (currently unused/commented)
  // const [user, setUser] = useState<IUser | null>(null);

  // STATE FOR REAL DEVICES DATA
  const [devices, setDevices] = useState<IDevice[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // MOCK DEVICES FOR PLACEHOLDER
  const mockDevices: IDevice[] = [
    { id: "mock-1", name: "Living Room Lamp", type: "lamp", status: false, room: "Living Room" },
    { id: "mock-2", name: "Living Room Fan", type: "fan", status: true, value: 2, room: "Living Room" },
    { id: "mock-3", name: "Bedroom Lamp", type: "lamp", status: true, room: "Bedroom" },
    { id: "mock-4", name: "Kitchen Sensor", type: "sensor", value: 23, room: "Kitchen" },
    { id: "mock-5", name: "Bathroom Sensor", type: "sensor", value: 20, room: "Bathroom" },
  ];

  // Date/time state
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');

  // Updating date/time every minute
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
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60_000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetching devices on mount
  useEffect(() => {
    const loadDevices = async () => {
      try {
        // User fetch ???
        // const [userData, deviceData] = await Promise.all([
        //   fetchCurrentUser(),
        //   fetchDevices(),
        // ]);
        // setUser(userData);

        const deviceData = await fetchDevices();
        if (deviceData.length > 0) {
          setDevices(deviceData); // REAL DEVICES
        } else {
          console.warn('No real devices, using mock data');
          setDevices(mockDevices); // MOCK DEVICES
        }
      } catch (err: any) {
        setDevices(mockDevices); // MOCK DEVICES FALLBACK
        setError('Using mock devices – real devices unavailable.');
      } finally {
        setLoading(false);
      }
    };
    loadDevices();
  }, []);

  // Toggle device handler (working for both REAL & MOCK)
  const handleToggle = async (device: IDevice) => {
    try {
      if (!device.id.startsWith('mock')) {
        await toggleDevice(device.id, !device.status);
      }
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

  // Fan speed handler (working for both REAL & MOCK)
  const handleSetFanSpeed = async (device: IDevice, speed: number) => {
    try {
      if (!device.id.startsWith('mock')) {
        await updateFanSpeed(device.id, speed);
      }
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

  // QUICK ACCESS BUTTONS
  const handleQuickAccess = (scene: string) => {
    setDevices((prev) =>
      prev
        ? prev.map((device) => {
            if (device.type === "lamp") {
              return { ...device, status: scene === "Wake Up" || scene === "Party" };
            }
            if (device.type === "fan") {
              return {
                ...device,
                status: scene !== "Good Night",
                value: scene === "Chill" ? 2 : scene === "Party" ? 5 : 1,
              };
            }
            return device;
          })
        : []
    );
  };

  if (loading) {
    return (
      <div className="devices-page">
        <p className="loading">Loading devices...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="devices-page error">
        <p>{error}</p>
      </div>
    );
  }

  const rooms = devices
    ? Array.from(new Set(devices.map((d) => d.room || 'Other')))
    : [];

  return (
    <div className="devices-page">
      {/* Header */}
      <header className="top-bar">
        <div className="time-date">
          <span className="time">{timeString}</span>
          <span className="date">{dateString}</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar">U</div>
          <span className="user-name">User</span>
        </div>
        <button className="settings-btn">Settings</button>
      </header>

      {/* Greeting and quick access buttons */}
      <section className="greeting-section">
        <h1>Good morning!</h1>
        <div className="quick-access">
          {['Wake Up', 'Chill', 'Party', 'Good Night'].map((scene) => (
            <button key={scene} onClick={() => handleQuickAccess(scene)}>
              {scene}
            </button>
          ))}
        </div>
      </section>

      {/* Rooms and devices */}
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