import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

interface Vop { id: number; done: boolean; hidden: boolean; note: string; }

interface Props {
  vop: Vop;
  onToggleDone: () => void;
  onToggleHidden: () => void;
  onUpdateNote?: (note: string) => void;
}

const VopItem: React.FC<Props> = ({ vop, onToggleDone, onToggleHidden, onUpdateNote }) => {
  const [editing, setEditing] = useState(false);
  const [tempNote, setTempNote] = useState(vop.note);

  const saveNote = () => { onUpdateNote?.(tempNote); setEditing(false); };

  return (
    <div className={`flex flex-col p-4 rounded-lg shadow-lg bg-gray-800 text-white transition-colors ${vop.done ? 'border-green-500 border' : 'border-gray-700 border'}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold">VOP {vop.id}</span>
        <button onClick={onToggleHidden} className="p-1">
          {vop.hidden ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={onToggleDone}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            vop.done
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {vop.done ? 'Afgehandeld' : 'Markeer als afgehandeld'}
        </button>
      </div>
      <div className="flex justify-between items-center">
        {editing ? (
          <input
            type="text"
            className="flex-grow bg-gray-700 border border-gray-600 rounded px-2 py-1 mr-2"
            value={tempNote}
            onChange={(e) => setTempNote(e.target.value)}
          />
        ) : (
          <span className="text-sm text-gray-400">{vop.note || 'Geen notities'}</span>
        )}
        <button onClick={() => editing ? saveNote() : setEditing(true)} className="p-1">
          {editing ? '💾' : '📝'}
        </button>
      </div>
    </div>
  );
};
export default VopItem;
