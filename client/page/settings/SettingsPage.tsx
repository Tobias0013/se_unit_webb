/* Author(s): Securella */
import React, { useState } from "react";

// IMPORT UserContext hook
import { useUser } from "../../component/user/UserContext";
import "./SettingsPage.css"; // if you have styles

const SettingsPage: React.FC = () => {
  // pull current username and setter from context
  const { username, setUsername } = useUser();

  // local draft state to edit
  const [draft, setDraft] = useState(username);

  const save = () => {
    setUsername(draft);
    // optional visual feedback
    alert("Username saved!");
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="form-group">
        <label>Your display name:</label>
        <input
          type="text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
        />
      </div>
      <button className="btn-save" onClick={save}>
        Save
      </button>
    </div>
  );
};

export default SettingsPage;
