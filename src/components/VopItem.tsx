import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { styles } from '../config/styles.config';
import { strings } from '../config/i18n';

interface Vop { id: number; done: boolean; hidden: boolean; note: string; }
interface Props {
  vop: Vop;
  locale: 'nl' | 'en';
  onToggleDone: () => void;
  onToggleHidden: () => void;
  onUpdateNote?: (note: string) => void;
}

const VopItem: React.FC<Props> = ({ vop, locale, onToggleDone, onToggleHidden, onUpdateNote }) => {
  const [editing, setEditing] = useState(false);
  const [tempNote, setTempNote] = useState(vop.note);
  const saveNote = () => { onUpdateNote?.(tempNote); setEditing(false); };

  const bgClass = vop.hidden ? styles.card.hidden : styles.card.visible;
  const doneClass = vop.done ? styles.card.doneButton.done : styles.card.doneButton.todo;

  return (
    <div className={`${styles.card.base} ${bgClass}`}>  
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold">
          {strings[locale].vopLabel} {vop.id}
        </span>
        <button onClick={onToggleHidden} className="p-1">
          {vop.hidden ? (
            <EyeOffIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="flex justify-between items-center mb-3">
        <button onClick={onToggleDone} className={`${doneClass} px-4 py-2 rounded-full`}>
          {vop.done ? strings[locale].handled : strings[locale].markHandled}
        </button>
      </div>
      <div className="flex justify-between items-center">
        {editing ? (
          <input
            type="text"
            className="flex-grow bg-gray-700 border border-gray-600 rounded px-2 py-1 mr-2"
            value={tempNote}
            onChange={e => setTempNote(e.target.value)}
          />
        ) : (
          <span className="text-sm text-gray-400">
            {vop.note || strings[locale].notesPlaceholder}
          </span>
        )}
        <button onClick={() => (editing ? saveNote() : setEditing(true))} className="p-1">
          {editing ? '💾' : '📝'}
        </button>
      </div>
    </div>
  );
};

export default VopItem;
