import React, { useState, useEffect } from "react";
import "./MainPage.css";
import { Link, useNavigate } from "react-router-dom";
// import { getSensors } from "../../controller/API/sensors";
import { handleAPIError } from "../../controller/API/connection";

const devicesData = [
  { id: 2, name: "Fan", type: "ac", status: "fan" },
  { id: 3, name: "Air Humidifier", type: "humidifier", status: "on" },
  { id: 4, name: "Lamp", type: "lamp", status: "off" },
  { id: 5, name: "WiFi Router", type: "router", status: "off" },
  { id: 6, name: "Speaker", type: "speaker", status: "off" },
];

const MainPage = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentSensorReadings, setCurrentSensorReadings] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [devices, setDevices] = useState(devicesData);
  const navigate = useNavigate();

  // 🔁 Hantera utloggning
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // rensar token
    navigate("/login"); // skickar till login
  };

  //  useEffect för att uppdatera datum
  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      };
      setCurrentDate(today.toLocaleDateString("en-US", options));
    };

    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function retrieveData() {
      try {
        // const resp = await getSensors(sessionStorage.getItem("token"));
        // setCurrentSensorReadings(resp.data);
        setError(null);
      } catch (error) {
        const message = handleAPIError(error, "Fetching temperature");
        setError(message);
      }
    }

    retrieveData();

    const interval = setInterval(() => {
      retrieveData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
          <Link to="/devices">Devices</Link>
          <a href="#">User</a>
          <a href="#">Notifications</a>
          <a href="#">Settings</a>
          <a href="#" onClick={handleLogout}>Logout</a>
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
            <p>{currentSensorReadings.value ?? "-"}{currentSensorReadings.unit ?? "-"}</p>
          </div>
          <div className="widget">
            <h3>Humidity</h3>
            <p>30%</p>
          </div>
        </section>

        {/* Felmeddelande */}
        {error && <div className="error">{error}</div>}

        {/* Device Controls */}
        <section className="devices">
          <h3>Device Controls</h3>
          <div className="device-grid">
            {devices.map((device) => (
              <Link to="/devices" key={device.id}>
                <div className={`device ${device.status}`}>
                  <span className="device-name">{device.name}</span>
                  <button className="toggle" onClick={(e) => {
                    e.preventDefault();
                    toggleDevice(device.id);
                  }}>
                    {device.status === "on" ? "Turn Off" : "Turn On"}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
