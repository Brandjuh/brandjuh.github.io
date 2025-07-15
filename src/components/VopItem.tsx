import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

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
    <div
      className={`flex flex-col p-4 rounded-lg shadow-lg transition-colors ${
        vop.hidden
          ? 'bg-gray-800 text-gray-400'
          : vop.done
          ? 'bg-green-50 text-gray-800'
          : 'bg-white text-gray-900'
      } dark:bg-gray-700 dark:text-gray-100 border ${
        vop.hidden
          ? 'border-gray-600'
          : vop.done
          ? 'border-green-500'
          : 'border-gray-300'
      }`}
    >
      {/* Header met VOP-id en hide toggle */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold">VOP {vop.id}</span>
        <button onClick={onToggleHidden} className="p-1">
          {vop.hidden ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Toggle afgehandeld-knop */}
      <div className="mb-3">
        <button
          onClick={onToggleDone}
          className={`w-full px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            vop.done
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {vop.done ? 'Afgehandeld' : 'Markeer als afgehandeld'}
        </button>
      </div>

      {/* Notitie sectie */}
      <div className="flex items-center space-x-2">
        {editing ? (
          <input
            type="text"
            className="flex-grow bg-transparent border border-gray-500 rounded px-2 py-1"
            value={tempNote}
            onChange={(e) => setTempNote(e.target.value)}
          />
        ) : (
          <span className="flex-grow text-sm italic">
            {vop.note || 'Geen notities'}
          </span>
        )}
        {editing ? (
          <>
            <button onClick={saveNote} className="text-green-500">💾</button>
            <button onClick={() => setEditing(false)} className="text-red-500">✖️</button>
          </>
        ) : (
          <button onClick={() => setEditing(true)} className="text-gray-500 hover:text-gray-700 dark:text-gray-300">
            📝
          </button>
        )}
      </div>
    </div>
  );
};

export default VopItem;
