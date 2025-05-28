/* Author(s): Securella */
import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import { toast } from "react-toastify";
import RoomCard from '../../component/RoomCard';
import QuickAccess from '../../component/QuickAccess';
import { fetchDevices, toggleDevice, updateFanSpeed, IDevice } from '../../controller/deviceController';
import { fetchSensors } from '../../controller/sensorController';
import { useNotifications } from '../../component/notifications/NotificationContext';

// greeting based on time
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 6)   return "Good night!";
  if (hour < 12)  return "Good morning!";
  if (hour < 18)  return "Good afternoon!";
  return "Good evening!";
}

// Default/mock devices in case backend fails
const defaultDevices: IDevice[] = [
  // Living Room
  { id: "mock-1",  name: "Light",         type: "light",         status: false, room: "Living Room" },
  { id: "mock-2",  name: "Fan",           type: "fan",           status: true,  value: 2, room: "Living Room" },
  { id: "mock-3",  name: "Buzzer",        type: "buzzer",        status: false, room: "Living Room" },
  { id: "mock-4",  name: "Sensor",        type: "sensor",        value: 22, room: "Living Room" },
  { id: "mock-5",  name: "Media Player",  type: "mediaplayer",   status: false, room: "Living Room" },
  // Bedroom
  { id: "mock-6",  name: "Light",         type: "light",         status: true,  room: "Bedroom" },
  { id: "mock-7",  name: "Fan",           type: "fan",           status: false, value: 1, room: "Bedroom" },
  { id: "mock-8",  name: "Buzzer",        type: "buzzer",        status: false, room: "Bedroom" },
  { id: "mock-9",  name: "Sensor",        type: "sensor",        value: 20, room: "Bedroom" },
  // Kitchen
  { id: "mock-10", name: "Light",         type: "light",         status: false, room: "Kitchen" },
  { id: "mock-11", name: "Fan",           type: "fan",           status: true,  value: 3, room: "Kitchen" },
  { id: "mock-12", name: "Buzzer",        type: "buzzer",        status: false, room: "Kitchen" },
  { id: "mock-13", name: "Sensor",        type: "sensor",        value: 21, room: "Kitchen" },
  { id: "mock-14", name: "Coffee Machine",type: "coffee_machine",status: false, room: "Kitchen" },
  // Bathroom
  { id: "mock-15", name: "Light",         type: "light",         status: false, room: "Bathroom" },
  { id: "mock-16", name: "Fan",           type: "fan",           status: false, value: 0, room: "Bathroom" },
  { id: "mock-17", name: "Buzzer",        type: "buzzer",        status: false, room: "Bathroom" },
  { id: "mock-18", name: "Sensor",        type: "sensor",        value: 19, room: "Bathroom" },
];

const DevicesPage: React.FC = () => {
  const [devices, setDevices] = useState<IDevice[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error,   setError]   = useState<string | null>(null);
  const { addNotification }   = useNotifications();

  // brew‐state per device, to show “Brewing…”
  const [brewingState, setBrewingState] = useState<Record<string,boolean>>({});

  // media player & playlist
  const audioRefs  = useRef<Record<string, HTMLAudioElement>>({});
  const playlist   = ['/sounds/song1.mp3','/sounds/song2.mp3','/sounds/song3.mp3'];
  const [trackIndex, setTrackIndex] = useState<Record<string,number>>({});

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
    const id = setInterval(updateDateTime, 60_000);
    return () => clearInterval(id);
  }, []);

  // Fetch devices and sensors, merge, fall back to default if both fail
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

      const normalizedDevices: IDevice[] = (deviceData || []).map((d: any) => ({
        id:     d.device_id,
        name:   d.device_name,
        type:   d.device_type,
        room:   d.location || 'Other',
        status: d.status === "on",
        value:  d.value ?? 0,
      }));
      const normalizedSensors: IDevice[] = (sensorData || []).map((s: any) => ({
        id:    s.sensor_id,
        name:  s.sensor_name || `${s.location} Sensor`,
        type:  "sensor",
        value: s.value,
        room:  s.location || 'Other',
        unit:  s.unit,
      }));

      const all = [...normalizedDevices, ...normalizedSensors];
      const merged = defaultDevices.map(def => {
        const real = all.find(d => d.room === def.room && d.type === def.type);
        return real ?? def;
      });

      setDevices(merged);
      setError(errorMsg || null);
      setLoading(false);
    };

    loadData();
  }, []);

  // Live temperature for mock sensors
  useEffect(() => {
    const id = setInterval(() => {
      setDevices(prev =>
        prev?.map(d =>
          d.type === "sensor"
            ? { ...d, value: parseFloat(Math.max(18, Math.min(28, (d.value ?? 21)+(Math.random()*2-1))).toFixed(1)) }
            : d
        ) || null
      );
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Toggle device (light & fan)
  const handleToggle = async (device: IDevice) => {
    try {
      const isMock = typeof device.id === 'string' && device.id.startsWith('mock');
      if (!isMock && (device.type === 'light' || device.type === 'fan')) {
        await toggleDevice(device.id, !device.status);
      }
      setDevices(prev =>
        prev?.map(d => d.id === device.id ? { ...d, status: !d.status } : d) || null
      );
    } catch (err: any) {
      setError(err.message || `Failed to toggle device: ${device.name}`);
    }
  };

  // separate ring handler for buzzers
  const handleRing = (device: IDevice) => {
    toast.info(`${device.room} buzzer is ringing`);
    addNotification({
      id:        `buzzer-${device.id}-${Date.now()}`,
      message:   `${device.room} buzzer is ringing`,
      type:      'info',
      timestamp: new Date(),
    });
    handleToggle(device);
    setTimeout(() => handleToggle(device), 3000);
  };

  // Fan speed handler
  const handleSetFanSpeed = async (device: IDevice, speed: number) => {
    try {
      const isMock = typeof device.id === 'string' && device.id.startsWith('mock');
      if (!isMock) {
        await updateFanSpeed(device.id, speed);
      }
      setDevices(prev =>
        prev?.map(d => d.id === device.id ? { ...d, value: speed } : d) || null
      );
    } catch (err: any) {
      setError(err.message || `Failed to set fan speed: ${device.name}`);
    }
  };

  // Quick access moods
  const handleQuickAccess = (scene: string) => {
    setDevices(prev =>
      prev?.map(d => {
        const isMock = typeof d.id === 'string' && d.id.startsWith('mock');
        if (!isMock) return d;
        if (d.type === 'light') return { ...d, status: scene === 'Wake Up' || scene === 'Party' };
        if (d.type === 'fan')   return { ...d, status: scene !== 'Good Night', value: scene === 'Chill' ? 2 : scene === 'Party' ? 5 : 1 };
        return d;
      }) || null
    );
    toast.success("Mood applied to devices!");

    if (scene === 'Party') {
      // start all mediaplayers on random tracks
      devices?.filter(d => d.type === 'mediaplayer').forEach(d => {
        const idx = Math.floor(Math.random() * playlist.length);
        audioRefs.current[d.id] = new Audio(playlist[idx]);
        audioRefs.current[d.id].play();
      });
      addNotification({
        id:        `party-${Date.now()}`,
        message:   `Party Jam is on!`,
        type:      'info',
        timestamp: new Date(),
      });
    }
  };

  // Command handler for buzzer, coffee & media
  const handleCommand = async (device: IDevice, command: string) => {
    // Buzzer “ring”
    if (device.type === 'buzzer' && command === 'ring') {
      handleRing(device);
      return;
    }

    // Coffee machine “brew”
    if (device.type === 'coffee_machine' && command === 'brew') {
      setBrewingState(s => ({ ...s, [device.id]: true }));
      const coffeeSound = new Audio('/sounds/coffee.mp3');
      coffeeSound.play();
      setTimeout(() => {
        setBrewingState(s => ({ ...s, [device.id]: false }));
        coffeeSound.pause();
        addNotification({
          id:        `coffee-${device.id}-${Date.now()}`,
          message:   `${device.room} coffee is ready!`,
          type:      'success',
          timestamp: new Date(),
        });
      }, 16000);
      return;
    }

    // Media player controls
    if (device.type === 'mediaplayer') {
      if (!audioRefs.current[device.id]) {
        const idx = trackIndex[device.id] || 0;
        audioRefs.current[device.id] = new Audio(playlist[idx]);
      }
      const player = audioRefs.current[device.id]!;
      let idx = trackIndex[device.id] || 0;

      switch (command) {
        case 'play':
          await player.play();
          addNotification({
            id:        `play-${device.id}-${Date.now()}`,
            message:   `Playing track ${idx + 1}`,
            type:      'info',
            timestamp: new Date(),
          });
          return;
        case 'pause':
          player.pause();
          addNotification({
            id:        `pause-${device.id}-${Date.now()}`,
            message:   'Media paused',
            type:      'info',
            timestamp: new Date(),
          });
          return;
        case 'next':
          player.pause();
          idx = (idx + 1) % playlist.length;
          setTrackIndex(t => ({ ...t, [device.id]: idx }));
          audioRefs.current[device.id] = new Audio(playlist[idx]);
          await audioRefs.current[device.id].play();
          addNotification({
            id:        `next-${device.id}-${Date.now()}`,
            message:   `Switched to track ${idx + 1}`,
            type:      'info',
            timestamp: new Date(),
          });
          return;
        case 'prev':
          player.pause();
          idx = (idx - 1 + playlist.length) % playlist.length;
          setTrackIndex(t => ({ ...t, [device.id]: idx }));
          audioRefs.current[device.id] = new Audio(playlist[idx]);
          await audioRefs.current[device.id].play();
          addNotification({
            id:        `prev-${device.id}-${Date.now()}`,
            message:   `Switched to track ${idx + 1}`,
            type:      'info',
            timestamp: new Date(),
          });
          return;
      }
    }
  };

  if (loading) return <div className="devices-page"><p className="loading">Loading devices...</p></div>;
  if (error)   return <div className="devices-page error"><p>{error}</p></div>;

  const rooms = Array.from(new Set(devices!.map(d => d.room || 'Other')));
  return (
    <div className="devices-page">
      <header className="top-bar">
        <div className="time-date">
          <span className="time">{timeString}</span>
          <span style={{margin:'0 0.5em',fontWeight:600}}>@</span>
          <span className="date">{dateString}</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar">U</div>
          <span className="user-name">User</span>
        </div>
        {/* <button className="notif-btn">🔔 Notification Center</button> */}
        <button className="settings-btn" onClick={() => navigate("/settings")}>
          ⚙️ Settings
        </button>
      </header>

      <section className="greeting-section">
        <h1>{getGreeting()}</h1>
        <QuickAccess onQuickAccess={handleQuickAccess} />
      </section>

      <section className="rooms-section">
        <h2>Rooms</h2>
        <div className="room-grid">
          {rooms.map(room => {
            const roomDevices = devices!.filter(d => d.room === room);
            return (
              <RoomCard
                key={room}
                roomName={room}
                devices={roomDevices}
                onToggle={handleToggle}
                onSetFanSpeed={handleSetFanSpeed}
                onCommand={handleCommand}
                brewingState={brewingState}
                audioRefs={audioRefs.current}
                trackIndex={trackIndex}              // <-- NEW
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default DevicesPage;

