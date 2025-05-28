/* Author(s): Securella */
import React, { useState, useEffect } from "react";
import { useUser } from "../../component/user/UserContext";
import "./SettingsPage.css";

const SettingsPage: React.FC = () => {
  const { username, setUsername } = useUser();
  const [draft, setDraft] = useState("");

  useEffect(() => {
    // initialize from context (or sessionStorage)
    setDraft(username);
  }, [username]);

  const save = () => {
    setUsername(draft);
    sessionStorage.setItem("username", draft);
    alert("Saved!");
  };

  return (
    <div className="page-container">
      <h1>Settings</h1>
      <div className="form-group">
        <label>Your display name:</label>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
      </div>
      <button className="primary-btn" onClick={save}>
        Save
      </button>
    </div>
  );
};

export default SettingsPage;