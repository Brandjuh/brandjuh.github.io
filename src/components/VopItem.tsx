import React, { useState } from 'react';

interface Vop {
  id: number;
  done: boolean;
  hidden: boolean;
  note: string;
}

interface Props {
  vop: Vop;
  onToggleDone: () => void;
  onToggleHidden: () => void;
  onUpdateNote: (note: string) => void;
}

const VopItem: React.FC<Props> = ({ vop, onToggleDone, onToggleHidden, onUpdateNote }) => {
  const [editing, setEditing] = useState(false);
  const [tempNote, setTempNote] = useState(vop.note);

  const saveNote = () => {
    onUpdateNote(tempNote);
    setEditing(false);
  };

  return (
    <div className="p-2 border rounded flex justify-between items-center bg-gray-50 dark:bg-gray-700">
      <div className="flex items-center space-x-2">
        <input type="checkbox" checked={vop.done} onChange={onToggleDone} />
        <span>VOP {vop.id}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={onToggleHidden} className="text-sm">
          {vop.hidden ? 'Ton(en)' : 'Verberg(en)'}
        </button>
        {editing ? (
          <div className="flex space-x-1">
            <input
              className="border rounded p-1"
              value={tempNote}
              onChange={(e) => setTempNote(e.target.value)}
            />
            <button onClick={saveNote}>💾</button>
          </div>
        ) : (
          <button onClick={() => setEditing(true)}>📝</button>
        )}
      </div>
    </div>
  );
};

export default VopItem;
