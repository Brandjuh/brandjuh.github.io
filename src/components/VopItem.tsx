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
  onUpdateNote?: (note: string) => void;
}

const VopItem: React.FC<Props> = ({ vop, onToggleDone, onToggleHidden, onUpdateNote }) => {
  const [editing, setEditing] = useState(false);
  const [tempNote, setTempNote] = useState(vop.note);

  const saveNote = () => {
    onUpdateNote?.(tempNote);
    setEditing(false);
  };

  return (
    <div className={`flex justify-between items-center p-4 rounded-lg shadow transition-colors ${vop.done ? 'bg-green-50' : 'bg-white'} dark:bg-gray-700`}>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={vop.done}
          onChange={onToggleDone}
          className="h-5 w-5 text-blue-600"
        />
        <span className="font-medium">VOP {vop.id}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleHidden}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-300"
        >
          {vop.hidden ? 'Toon' : 'Verberg'}
        </button>
        {editing ? (
          <div className="flex space-x-1">
            <input
              type="text"
              className="border rounded px-2 py-1"
              value={tempNote}
              onChange={(e) => setTempNote(e.target.value)}
            />
            <button onClick={saveNote} className="text-blue-500">💾</button>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} className="text-gray-500 hover:text-gray-700 dark:text-gray-300">📝</button>
        )}
      </div>
    </div>
  );
};

export default VopItem;
