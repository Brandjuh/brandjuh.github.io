import React, { useState, useEffect } from 'react';
import VopItem from './components/VopItem';
import useLocalStorage from './hooks/useLocalStorage';
import { styles } from './config/styles.config';
import { strings } from './config/i18n';
import Confetti from 'react-confetti';
import confetti from 'canvas-confetti';
import { Fireworks } from 'fireworks-js';

interface Vop { id: number; done: boolean; hidden: boolean; note: string; }

const App: React.FC = () => {
  const [vops, setVops] = useLocalStorage<Vop[]>(
    'vops',
    Array.from({ length: 14 }, (_, i) => ({ id: i + 1, done: false, hidden: false, note: '' }))
  );

  const [locale, setLocale] = useState<'nl' | 'en'>(
    navigator.language.startsWith('en') ? 'en' : 'nl'
  );

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Toggle handlers
  const toggleDone = (id: number) =>
    setVops(vops.map(v => (v.id === id ? { ...v, done: !v.done } : v)));
  const toggleHidden = (id: number) =>
    setVops(vops.map(v => (v.id === id ? { ...v, hidden: !v.hidden } : v)));
  const resetAll = () =>
    setVops(vops.map(v => ({ ...v, done: false, hidden: false, note: '' })));
  const markAll = () => setVops(vops.map(v => ({ ...v, done: true })));
  const showAll = () => setVops(vops.map(v => ({ ...v, hidden: false })));
  const hideAll = () => setVops(vops.map(v => ({ ...v, hidden: true })));

  // Progress
  const doneCount = vops.filter(v => v.done && !v.hidden).length;
  const pendingCount = vops.filter(v => !v.done && !v.hidden).length;
  const ordered = [...vops.filter(v => !v.hidden), ...vops.filter(v => v.hidden)];
  const allHandled = ordered.filter(v => !v.hidden).every(v => v.done) && doneCount > 0;

  // Canvas confetti + fireworks on complete
  useEffect(() => {
    if (allHandled) {
      // Canvas confetti
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    }
  }, [allHandled]);

  return (
    <div className={styles.overview.container}>
      {/* Header & Progress Bar hier... */}

      <div className={styles.grid}>
        {ordered.map(v => (
          <VopItem
            key={v.id}
            vop={v}
            locale={locale}
            onToggleDone={() => toggleDone(v.id)}
            onToggleHidden={() => toggleHidden(v.id)}
            onUpdateNote={(note) =>
              setVops(vops.map(x => (x.id === v.id ? { ...x, note } : x)))
            }
          />
        ))}
      </div>

      <footer className={styles.quickActions}>
        <button onClick={resetAll} className={`${styles.quickButton} ${styles.quickButtonVariants.resetAll}`}>
          {strings[locale].resetAll}
        </button>
        <button onClick={markAll} className={`${styles.quickButton} ${styles.quickButtonVariants.markAll}`}>
          {strings[locale].markAll}
        </button>
        <button onClick={showAll} className={`${styles.quickButton} ${styles.quickButtonVariants.showAll}`}>
          {strings[locale].showAll}
        </button>
        <button onClick={hideAll} className={`${styles.quickButton} ${styles.quickButtonVariants.hideAll}`}>
          {strings[locale].hideAll}
        </button>
        <button onClick={() => setLocale(locale === 'nl' ? 'en' : 'nl')} className={`${styles.quickButton} ${styles.quickButtonVariants.locale}`}>
          {locale === 'nl' ? '🇬🇧' : '🇳🇱'}
        </button>
      </footer>

      {/* React Confetti */}
      {allHandled && <Confetti numberOfPieces={500} gravity={0.3} recycle={false} colors={['#F58220', '#002E5D', '#7C2851']} />}

      {/* Fireworks */}
      {allHandled && <Fireworks options={{ rocketsPoint: { min: 0.1, max: 0.9 } }} />}
    </div>
  );
};

export default App;
