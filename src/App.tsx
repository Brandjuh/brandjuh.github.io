import React, { useState, useEffect } from 'react';
import VopItem from './components/VopItem';
import useLocalStorage from './hooks/useLocalStorage';
import { styles } from './config/styles.config';
import { strings } from './config/i18n';

interface Vop { id: number; done: boolean; hidden: boolean; note: string; }

const App: React.FC = () => {
  const [vops, setVops] = useLocalStorage<Vop[]>(
    'vops', Array.from({ length: 14 }, (_, i) => ({ id: i+1, done: false, hidden: false, note: '' }))
  );
  // Altijd dark mode
  useEffect(() => { document.documentElement.classList.add('dark'); }, []);

  const [locale, setLocale] = useState<'nl' | 'en'>(() =>
    navigator.language.startsWith('en') ? 'en' : 'nl'
  );

  const toggleDone = (id: number) =>
    setVops(vops.map(v => v.id === id ? { ...v, done: !v.done } : v));
  const toggleHidden = (id: number) =>
    setVops(vops.map(v => v.id === id ? { ...v, hidden: !v.hidden } : v));
  const resetAll = () =>
    setVops(vops.map(v => ({ ...v, done: false, hidden: false, note: '' })));

  const handledCount = vops.filter(v => v.done).length;
  const pendingCount = vops.length - handledCount;
  const progressPercent = Math.round((handledCount / vops.length) * 100);
  const orderedVops = [...vops.filter(v => !v.hidden), ...vops.filter(v => v.hidden)];

  return (
    <div className={styles.overview.container}>
      {/* Header met titel + onderschrift + taal */}
      <header className={`${styles.overview.header} flex-col items-start space-y-2`}>
        <h1 className="text-4xl font-bold">{strings[locale].title || 'VOP TOOL'}</h1>
        <p className="text-gray-400">{strings[locale].subtitle || 'By Roel on the ramp'}</p>
        <div className="flex items-center space-x-4">
          {/* Voortgangsbalk */}
          <div className="w-full bg-gray-700 h-4 rounded">
            <div
              className="bg-blue-500 h-4 rounded"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-sm text-gray-300">{progressPercent}%</span>
          {/* Taalkeuze */}
          <select
            value={locale}
            onChange={e => setLocale(e.target.value as 'nl' | 'en')}
            className="p-1 rounded bg-gray-800 text-white w-24"
          >
            <option value="nl">🇳🇱 NL</option>
            <option value="en">🇬🇧 EN</option>
          </select>
        </div>
      </header>

      {/* Grid VOP */}
      <div className={styles.grid}>
        {orderedVops.map(v => (
          <VopItem
            key={v.id}
            vop={v}
            onToggleDone={() => toggleDone(v.id)}
            onToggleHidden={() => toggleHidden(v.id)}
            onUpdateNote={note => setVops(vops.map(item => item.id === v.id ? { ...item, note } : item))}
          />
        ))}
      </div>

      {/* Quick Actions met gelijke breedte knoppen */}
      <div className={`${styles.quickActions} justify-center`}>  
        {['resetAll', 'markAll', 'showAll', 'hideAll'].map(key => (
          <button
            key={key}
            onClick={() => {
              if (key === 'resetAll') resetAll();
              if (key === 'markAll') vops.forEach(v => !v.done && toggleDone(v.id));
              if (key === 'showAll') vops.forEach(v => !v.hidden && toggleHidden(v.id));
              if (key === 'hideAll') vops.forEach(v => v.hidden && toggleHidden(v.id));
            }}
            className="w-40 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
          >
            {strings[locale][key]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
