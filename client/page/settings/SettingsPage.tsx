/* Author(s): Securella */
import React, { useState, useEffect } from "react";
import { useUser } from "../../component/user/UserContext";

const SettingsPage: React.FC = () => {
  const { username, setUsername } = useUser();
  const [draft, setDraft] = useState(username);

  useEffect(() => { setDraft(username); }, [username]);

  const save = () => {
    setUsername(draft);
    sessionStorage.setItem("username", draft);
    /* no full reload needed—context update will re‐render header */
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
      <button onClick={save}>Save</button>
    </div>
  );
};

export default SettingsPage;
