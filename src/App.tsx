import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import VopItem from './components/VopItem';
import useLocalStorage from './hooks/useLocalStorage';

interface Vop { id: number; done: boolean; hidden: boolean; note: string; }

const App: React.FC = () => {
  const [vops, setVops] = useLocalStorage<Vop[]>(
    'vops',
    Array.from({ length: 14 }, (_, i) => ({ id: i+1, done: false, hidden: false, note: '' }))
  );
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);

  const toggleDone = (id: number) => setVops(vops.map(v => v.id === id ? { ...v, done: !v.done } : v));
  const toggleHidden = (id: number) => setVops(vops.map(v => v.id === id ? { ...v, hidden: !v.hidden } : v));
  const resetAll = () => setVops(vops.map(v => ({ ...v, done: false, hidden: false, note: '' })));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const visible = vops.filter(v => !v.hidden);
  const hidden = vops.filter(v => v.hidden);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="space-y-4 mt-6">
          {visible.map(v => (
            <VopItem
              key={v.id}
              vop={v}
              onToggleDone={() => toggleDone(v.id)}
              onToggleHidden={() => toggleHidden(v.id)}
            />
          ))}

          {hidden.length > 0 && (
            <details className="mt-4 bg-gray-200 dark:bg-gray-800 p-3 rounded-lg">
              <summary className="font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                Verborgen VOPs ({hidden.length})
              </summary>
              <div className="mt-3 space-y-4">
                {hidden.map(v => (
                  <VopItem
                    key={v.id}
                    vop={v}
                    onToggleDone={() => toggleDone(v.id)}
                    onToggleHidden={() => toggleHidden(v.id)}
                  />
                ))}
              </div>
            </details>
          )}
        </div>

        <Footer onReset={resetAll} />
      </div>
    </div>
  );
};

export default App;
