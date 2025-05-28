/* Author(s): Tobias Vinblad */
/*            Securella: logo + user logic */

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./header.css";
import { tokenExists, isAdmin } from "../../controller/jwtToken";
import logo from "../logo/smart_home_logo.png";

// ← IMPORT UserContext hook
import { useUser } from "../../component/user/UserContext";
import { NotificationBell } from "../notifications/NotificationBell";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(tokenExists());
  const [isAdminUser, setIsAdminUser] = useState(isAdmin());
  const [showNavBar, setShowNavBar] = useState(false);

  // ← PULL username from context
  const { username } = useUser();
  const navigate = useNavigate();

  // build nav items
  const navBarItems = [
    { text: "Home", link: "/" },
    ...(isLoggedIn ? [{ text: "Devices", link: "/devices" }] : []),
    ...(isAdminUser ? [{ text: "Add Device", link: "/addDevice" }] : []),
    ...(isLoggedIn ? [{ text: "Schedule", link: "/schedule" }] : []),
    ...(isAdminUser ? [{ text: "Admin", link: "/admin" }] : []),
    ...(isLoggedIn
      ? [{ text: "🔔 Notification Center", link: "#" }]
      : []),
    ...(isLoggedIn
      ? [{ text: "⚙️ Settings", link: "/settings" }]
      : []),
    isLoggedIn
      ? { text: "Logout", link: "/logout" }
      : { text: "Login/Register", link: "/login" },
  ];

  useEffect(() => {
    setIsLoggedIn(tokenExists());
    setIsAdminUser(isAdmin());
  }, [location]);

  return (
    <header>
      <Link to={"/"}>
        <div className="header-logo">
          <img src={logo} alt="Smart Home" className="logo-img" />
          <p>SmartHouse</p>
        </div>
      </Link>

      <div
        className="header-nav-icon"
        onClick={() => setShowNavBar(!showNavBar)}
      >
        <span className="material-icons">
          {showNavBar ? "menu_open" : "menu"}
        </span>
      </div>

      <div
        className={"header-nav"}
        style={
          showNavBar ? { height: `${navBarItems.length * 4.3 + 1.5}rem` } : {}
        }
      >
        <ul className="header-navbar" onClick={() => setShowNavBar(false)}>
          {navBarItems.map((item) => (
            <li key={item.text}>
              <Link to={item.link}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
