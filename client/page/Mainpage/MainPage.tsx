import React, { useState, useEffect } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";

const devicesData = [
  { id: 1, name: "Smart TV", type: "tv", status: "on" },
  { id: 2, name: "Air Conditioner", type: "ac", status: "on" },
  { id: 3, name: "Air Humidifier", type: "humidifier", status: "on" },
  { id: 4, name: "Lights", type: "light", status: "off" },
  { id: 5, name: "WiFi Router", type: "router", status: "off" },
  { id: 6, name: "Speaker", type: "speaker", status: "off" },
];

const MainPage = () => {
  
  const [currentDate, setCurrentDate] = useState("");

  
  const [devices, setDevices] = useState(devicesData);

  //  useEffect för att uppdatera datum
  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setCurrentDate(today.toLocaleDateString("en-US", options));
    };

    updateDate(); 

    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval); 
  }, []);

  // Funktionen för att slå på och  enheter
  const toggleDevice = (id: number) => {
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === id
          ? { ...device, status: device.status === "on" ? "off" : "on" }
          : device
      )
    );
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Smart Home</h2>
        <nav>
          <a href="#" className="active">Home</a>
          <a href="#">Devices</a>
          <a href="#">User</a>
          <a href="#">Notifications</a>
          <a href="#">Settings</a>
          <Link to="/logout">Logout</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1>Living Room</h1>
            <span>{currentDate}</span> 
          </div>
          <div className="user-info">
            <img src="https://via.placeholder.com/40" alt="User" className="user-avatar" />
          </div>
        </header>

        {/* Info Widgets */}
        <section className="info-widgets">
          <div className="widget">
            <h3>Temperature</h3>
            <p>+20°C</p>
          </div>
          <div className="widget">
            <h3>Humidity</h3>
            <p>30%</p>
          </div>
        </section>

        {/* Energy Usage */}
        <section className="graph-section">
          <h2>Usage Statistics</h2>
          <div className="graph-placeholder">
            <p>Graph will be placed here</p>
          </div>
        </section>

        {/* Device Controls */}
        <section className="devices">
          <h3>Device Controls</h3>
          <div className="device-grid">
            {devices.map((device) => (
              <div key={device.id} className={`device ${device.status}`}>
                <span className="device-name">{device.name}</span>
                <button className="toggle" onClick={() => toggleDevice(device.id)}>
                  {device.status === "on" ? "Turn Off" : "Turn On"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
