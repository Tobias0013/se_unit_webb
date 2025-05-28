/* Author(s): Securella */
import React, { useEffect, useState } from 'react';
import './style.css';
import { toast } from "react-toastify";
import RoomCard from '../../component/RoomCard';
import QuickAccess from '../../component/QuickAccess';
import { fetchDevices, toggleDevice, updateFanSpeed, IDevice } from '../../controller/deviceController';
import { fetchSensors } from '../../controller/sensorController';

// greeting based on time
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 6) return "Good night!";
  if (hour < 12) return "Good morning!";
  if (hour < 18) return "Good afternoon!";
  return "Good evening!";
}

// Default/mock devices in case backend fails
const defaultDevices: IDevice[] = [
  // Living Room
  { id: "mock-1", name: "Light", type: "light", status: false, room: "Living Room" },
  { id: "mock-2", name: "Fan", type: "fan", status: true, value: 2, room: "Living Room" },
  { id: "mock-3", name: "Buzzer", type: "buzzer", status: false, room: "Living Room" },
  { id: "mock-4", name: "Sensor", type: "sensor", value: 22, room: "Living Room" },
  { id: "mock-5", name: "Media Player", type: "mediaplayer", status: false, room: "Living Room" },
  // Bedroom
  { id: "mock-6", name: "Light", type: "light", status: true, room: "Bedroom" },
  { id: "mock-7", name: "Fan", type: "fan", status: false, value: 1, room: "Bedroom" },
  { id: "mock-8", name: "Buzzer", type: "buzzer", status: false, room: "Bedroom" },
  { id: "mock-9", name: "Sensor", type: "sensor", value: 20, room: "Bedroom" },
  // Kitchen
  { id: "mock-10", name: "Light", type: "light", status: false, room: "Kitchen" },
  { id: "mock-11", name: "Fan", type: "fan", status: true, value: 3, room: "Kitchen" },
  { id: "mock-12", name: "Buzzer", type: "buzzer", status: false, room: "Kitchen" },
  { id: "mock-13", name: "Sensor", type: "sensor", value: 21, room: "Kitchen" },
  { id: "mock-14", name: "Coffee Machine", type: "coffee_machine", status: false, room: "Kitchen" },
  // Bathroom
  { id: "mock-15", name: "Light", type: "light", status: false, room: "Bathroom" },
  { id: "mock-16", name: "Fan", type: "fan", status: false, value: 0, room: "Bathroom" },
  { id: "mock-17", name: "Buzzer", type: "buzzer", status: false, room: "Bathroom" },
  { id: "mock-18", name: "Sensor", type: "sensor", value: 19, room: "Bathroom" },
];

const DevicesPage: React.FC = () => {
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
      setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDateString(now.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' }));
    };
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 60_000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetch devices AND sensors, merge, fall back to default if both fail
  useEffect(() => {
    const loadData = async () => {
      let errorMsg = '';
      let deviceData: any[] = [];
      let sensorData: any[] = [];

      try {
        deviceData = await fetchDevices();
      } catch (err) {
        errorMsg += 'Failed to fetch devices. ';
        console.warn("Device fetch error:", err);
      }

      try {
        sensorData = await fetchSensors();
      } catch (err) {
        errorMsg += 'Failed to fetch sensors. ';
        console.warn("Sensor fetch error:", err);
      }

      // device data
      const normalizedDevices: IDevice[] = (deviceData || []).map((d: any) => ({
        id: d.device_id,
        name: d.device_name, // full string from DB
        type: d.device_type,
        room: d.location || 'Other',
        status: d.status === "on",
        value: d.value ?? 0
      }));

      // sensor data
      const normalizedSensors: IDevice[] = (sensorData || []).map((s: any) => ({
        id: s.sensor_id,
        name: s.sensor_name || `${s.location} Sensor`,
        type: "sensor",
        value: s.value,
        room: s.location || 'Other',
        unit: s.unit
      }));

      const allDevices = [...normalizedDevices, ...normalizedSensors];

      // For each slot in defaultDevices, pick real device if present,
      // otherwise fall back to the default entry.
      const mergedDevices = defaultDevices.map(def => {
        const real = allDevices.find(d =>
          d.room === def.room && d.type === def.type
        );
        return real ?? def;
      });
      
      setDevices(mergedDevices);
      setError(errorMsg || null);
      setLoading(false);
    };

    loadData();
  }, []);

  // Live temperature for mock sensors
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev?.map(device => {
        // wiggle any sensor
        if (device.type === "sensor") { // commented out: && typeof device.id === "string" && device.id.startsWith("mock")
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

    // allow both lights and fans to call backend
    if (!isMock && (device.type === 'light' || device.type === 'fan')) {
      await toggleDevice(device.id, !device.status);
    }

    // showing in UI
    setDevices(prev =>
      prev?.map(d =>
        d.id === device.id ? { ...d, status: !d.status } : d
      ) ?? null
    );
  } catch (err: any) {
    setError(err.message || `Failed to toggle device: ${device.name}`);
  }
};

  // Fan speed handler (frontend only/dummy)
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

  // Quick access moods (dummy for now)
  const handleQuickAccess = (scene: string) => {
    setDevices((prev) =>
      prev
        ? prev.map((device) => {
            const isMock = typeof device.id === 'string' && device.id.startsWith('mock');
            if (!isMock) return device;

            if (device.type === "light") {
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
    toast.success("Mood applied to devices!");
  };

  const handleCommand = async (device: IDevice, command: string) => {
    toast.info(`Command "${command}" sent to ${device.name}`);
    return Promise.resolve();
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
          <span style={{ margin: "0 0.5em", fontWeight: 600 }}>@</span>
          <span className="date">{dateString}</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar">U</div>
          <span className="user-name">User</span>
        </div>
        <button className="settings-btn">Settings</button>
      </header>

      <section className="greeting-section">
        <h1>{getGreeting()}</h1>
        <QuickAccess onQuickAccess={handleQuickAccess} />
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
                onCommand={handleCommand}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DevicesPage;
