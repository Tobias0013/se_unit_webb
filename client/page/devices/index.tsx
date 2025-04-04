import React, { useEffect, useState } from 'react';
import './style.css';
import { toast } from "react-toastify";
import RoomCard from '../../component/RoomCard';

import {
  fetchDevices,
  toggleDevice,
  updateFanSpeed,
  IDevice,
} from '../../controller/deviceController';

import DeviceList from '../../component/DeviceList';

/**
 * DevicesPage displays smart devices grouped by room and allows controlling them.
 */
const DevicesPage: React.FC = () => {

  // STATE FOR DEVICES
  const [devices, setDevices] = useState<IDevice[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // MOCK DEVICES
  const mockDevices: IDevice[] = [
    // Living Room
    { id: "mock-1", name: "Lamp", type: "lamp", status: false, room: "Living Room" },
    { id: "mock-2", name: "Fan", type: "fan", status: true, value: 2, room: "Living Room" },
    { id: "mock-3", name: "Sensor", type: "sensor", value: 22, room: "Living Room" },
    // Bedroom
    { id: "mock-4", name: "Lamp", type: "lamp", status: true, room: "Bedroom" },
    { id: "mock-5", name: "Fan", type: "fan", status: false, value: 1, room: "Bedroom" },
    { id: "mock-6", name: "Sensor", type: "sensor", value: 20, room: "Bedroom" },
    // Kitchen
    { id: "mock-7", name: "Lamp", type: "lamp", status: false, room: "Kitchen" },
    { id: "mock-8", name: "Fan", type: "fan", status: true, value: 3, room: "Kitchen" },
    { id: "mock-9", name: "Sensor", type: "sensor", value: 21, room: "Kitchen" },
    // Bathroom
    { id: "mock-10", name: "Lamp", type: "lamp", status: false, room: "Bathroom" },
    { id: "mock-11", name: "Fan", type: "fan", status: false, value: 0, room: "Bathroom" },
    { id: "mock-12", name: "Sensor", type: "sensor", value: 19, room: "Bathroom" },
  ];

  // Date/time state
  const [timeString, setTimeString] = useState<string>('');
  const [dateString, setDateString] = useState<string>('');

  // Updating date/time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateString(now.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' }));
    };
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60_000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetching devices
  useEffect(() => {
    const loadDevices = async () => {
      try {
        const deviceData = await fetchDevices();
        const normalizedData: IDevice[] = deviceData.map((d: any) => ({
          id: d.device_id,
          name: d.device_name,
          type: d.device_type,
          room: d.location || 'Other',
          status: d.status === "on",
          value: d.value ?? 0
        }));


        setDevices(normalizedData.length > 0 ? normalizedData : mockDevices);
      } catch (err: unknown) {
        console.warn("Backend unreachable or failed. Falling back to mock devices.");
        setDevices(mockDevices);
        setError('Using mock devices – real devices unavailable.');
      } finally {
        setLoading(false);
      }
    };
    loadDevices();
  }, []);

  // ✅ LIVE temperature fluctuation for mock sensors
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev?.map(device => {
        if (device.type === "sensor" && typeof device.id === "string" && device.id.startsWith("mock")) {
          const variation = parseFloat((Math.random() * 2 - 1).toFixed(1));
          const newTemp = Math.max(18, Math.min(28, (device.value ?? 21) + variation));
          return { ...device, value: parseFloat(newTemp.toFixed(1)) };
        }
        return device;
      }) || null);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Toggle device
  const handleToggle = async (device: IDevice) => {
    try {
      const isMock = typeof device.id === 'string' && device.id.startsWith('mock');
      if (!isMock && device.type === 'lamp') {
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

  // Fan speed handler
  const handleSetFanSpeed = async (device: IDevice, speed: number) => {
    try {
      const isMock = typeof device.id === 'string' && device.id.startsWith('mock');
      if (!isMock) {
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

  // Quick access moods
  const handleQuickAccess = (scene: string) => {
    setDevices((prev) =>
      prev
        ? prev.map((device) => {
            const isMock = typeof device.id === 'string' && device.id.startsWith('mock');
            if (!isMock) return device;

            if (device.type === "lamp") {
              const newStatus = scene === "Wake Up" || scene === "Party";
              return { ...device, status: newStatus };
            }
            if (device.type === "fan") {
              const newSpeed = scene === "Chill" ? 2 : scene === "Party" ? 5 : 1;
              const newStatus = scene !== "Good Night";
              return { ...device, status: newStatus, value: newSpeed };
            }
            return device;
          })
        : []
    );
    toast.success("Mood applied to mock devices!");
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

      <section className="rooms-section">
        <h2>Rooms</h2>
        <div className="room-grid">
          {rooms.map((room) => {
            const roomDevices = devices?.filter((d) => (d.room || 'Other') === room) || [];
            return (
              <RoomCard
                key={room}
                roomName={room}
                devices={roomDevices}
                onToggle={handleToggle}
                onSetFanSpeed={handleSetFanSpeed}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

// ROOM ICONS
const getRoomEmoji = (room: string) => {
  switch (room) {
    case "Living Room": return "🛋";
    case "Bedroom": return "🛏";
    case "Kitchen": return "🍳";
    case "Bathroom": return "🛁";
    default: return "🏠";
  }
};

export default DevicesPage;
