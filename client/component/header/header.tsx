import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./header.css";
import { tokenExists, isAdmin, tokenPayload } from "../../controller/jwtToken";

export default function Header() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(tokenExists());
  const [isAdminUser, setIsAdminUser] = useState(isAdmin());

  let navBarItems = [
    { text: "Home", link: "/form-list" },
    ...(isAdminUser ? [{ text: "<admin>", link: "/admin" }] : []),
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
          <p>{"<LOGO>"}</p>
        </div>
      </Link>

      <div className={"header-nav"}>
        <ul className="header-navbar">
          {navBarItems.map((item) => {
            return (
              <li key={item.text}>
                <Link to={item.link}>{item.text}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
