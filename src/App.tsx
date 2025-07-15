import React, { useEffect } from 'react';
import VopItem from './components/VopItem';
import useLocalStorage from './hooks/useLocalStorage';
import { styles } from './config/styles.config';
import { strings } from './config/i18n';

interface Vop { id: number; done: boolean; hidden: boolean; note: string; }

const App: React.FC = () => {
  const [vops, setVops] = useLocalStorage<Vop[]>(
    'vops', Array.from({ length: 14 }, (_, i) => ({ id: i+1, done: false, hidden: false, note: '' }))
  );
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', true);
  const locale = 'nl';

  useEffect(() => { document.documentElement.classList.toggle('dark', darkMode); }, [darkMode]);

  const toggleDone = (id: number) => setVops(vops.map(v => v.id === id ? { ...v, done: !v.done } : v));
  const toggleHidden = (id: number) => setVops(vops.map(v => v.id === id ? { ...v, hidden: !v.hidden } : v));
  const resetAll = () => setVops(vops.map(v => ({ ...v, done: false, hidden: false, note: '' })));

  const handledCount = vops.filter(v => v.done).length;
  const pendingCount = vops.length - handledCount;
  const orderedVops = [...vops.filter(v => !v.hidden), ...vops.filter(v => v.hidden)];

  return (
    <div className={styles.overview.container}>
      <div className={styles.overview.header}>
        <h2 className={styles.overview.title}>{strings[locale].progressTitle}</h2>
        <div className={styles.overview.stats}>
          <div className={styles.overview.statsCount}>{handledCount}/{vops.length}</div>
          <div className={styles.overview.statsLabel}>{pendingCount} {strings[locale].remaining}</div>
        </div>
      </div>

      <div className={styles.grid}>
        {orderedVops.map(v => (
          <VopItem
            key={v.id}
            vop={v}
            onToggleDone={() => toggleDone(v.id)}
            onToggleHidden={() => toggleHidden(v.id)}
            onUpdateNote={(note) => setVops(vops.map(item => item.id === v.id ? { ...item, note } : item))}
          />
        ))}
      </div>

      <div className={styles.quickActions}>
        <button onClick={resetAll} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">
          {strings[locale].resetAll}
        </button>
        <button onClick={() => vops.forEach(v => !v.done && toggleDone(v.id))} className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">
          {strings[locale].markAll}
        </button>
        <button onClick={() => vops.forEach(v => !v.hidden && toggleHidden(v.id))} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
          {strings[locale].showAll}
        </button>
        <button onClick={() => vops.forEach(v => v.hidden && toggleHidden(v.id))} className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700">
          {strings[locale].hideAll}
        </button>
      </div>
    </div>
  );
};

export default App;
