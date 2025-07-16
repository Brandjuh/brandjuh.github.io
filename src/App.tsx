import React, { useState, useEffect } from 'react';
import VopItem from './components/VopItem';
import useLocalStorage from './hooks/useLocalStorage';
import { styles } from './config/styles.config';
import { strings } from './config/i18n';
import Confetti from 'react-confetti';

interface Vop { id: number; done: boolean; hidden: boolean; note: string; }

const App: React.FC = () => {
  const [vops, setVops] = useLocalStorage<Vop[]>(
    'vops', Array.from({ length: 14 }, (_, i) => ({ id: i+1, done: false, hidden: false, note: '' }))
  );
  const [locale, setLocale] = useState<'nl' | 'en'>(() =>
    navigator.language.startsWith('en') ? 'en' : 'nl'
  );

  useEffect(() => { document.documentElement.classList.add('dark'); }, []);

  // Toggle handlers
  const toggleDone = (id: number) =>
    setVops(vops.map(v => v.id === id ? { ...v, done: !v.done } : v));
  const toggleHidden = (id: number) =>
    setVops(vops.map(v => v.id === id ? { ...v, hidden: !v.hidden } : v));
  const resetAll = () =>
    setVops(vops.map(v => ({ ...v, done: false, hidden: false, note: '' })));
  const markAll = () => setVops(vops.map(v => ({ ...v, done: true })));
  const showAll = () => setVops(vops.map(v => ({ ...v, hidden: false })));
  const hideAll = () => setVops(vops.map(v => ({ ...v, hidden: true })));

  // Progress
  const doneCount = vops.filter(v => v.done && !v.hidden).length;
  const pendingCount = vops.filter(v => !v.done && !v.hidden).length;
  const ordered = [...vops.filter(v => !v.hidden), ...vops.filter(v => v.hidden)];
  const allHandled = doneCount > 0 && ordered.filter(v => !v.hidden).every(v => v.done);

  return (
    <div className={styles.overview.container}>
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">{strings[locale].titleCustom}</h1>
        <p className="text-sm text-gray-400">{strings[locale].subtitleCustom}</p>
      </header>

      {/* Progress bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="w-full bg-gray-700 h-3 rounded">
          <div
            className="bg-blue-500 h-3 rounded"
            style={{ width: `${Math.round((doneCount / (doneCount + pendingCount || 1)) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{doneCount} {strings[locale].handled}</span>
          <span>{pendingCount} {strings[locale].remaining}</span>
        </div>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {ordered.map(v => (
          <VopItem
            key={v.id}
            vop={v}
            onToggleDone={() => toggleDone(v.id)}
            onToggleHidden={() => toggleHidden(v.id)}
            onUpdateNote={note => setVops(vops.map(x => x.id === v.id ? { ...x, note } : x))}
          />
        ))}
      </div>

      {/* Footer Actions */}
      <footer className={styles.quickActions}>
        <button onClick={resetAll} className="flex-1 px-4 py-2 vigo-orange rounded hover:vigo-orange">{strings[locale].resetAll}</button>
        <button onClick={markAll} className="flex-1 px-4 py-2 vigo-red rounded hover:vigo-red">{strings[locale].markAll}</button>
        <button onClick={showAll} className="flex-1 px-4 py-2 vigo-purple rounded hover:vigo-purple">{strings[locale].showAll}</button>
        <button onClick={hideAll} className="flex-1 px-4 py-2 vigo-blue rounded hover:vigo-blue">{strings[locale].hideAll}</button>
        <button onClick={() => setLocale(locale === 'nl' ? 'en' : 'nl')} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
          {locale === 'nl' ? '🇬🇧' : '🇳🇱'}
        </button>
      </footer>

      {allHandled && <Confetti recycle={false} />}
    </div>
  );
};

export default App;
