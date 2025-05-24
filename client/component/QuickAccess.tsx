/* Author(s): Securella */
import React from 'react';
import './QuickAccess.css';

const scenes = ['Wake Up', 'Chill', 'Party', 'Good Night'];

const QuickAccess: React.FC<{ onQuickAccess: (scene: string) => void }> = ({ onQuickAccess }) => (
  <div className="quick-access">
    {scenes.map((scene) => (
      <button key={scene} onClick={() => onQuickAccess(scene)}>
        {scene}
      </button>
    ))}
  </div>
);

export default QuickAccess;
