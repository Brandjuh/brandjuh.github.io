import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import VopItem from './components/VopItem';
import useLocalStorage from './hooks/useLocalStorage';

interface Vop {
  id: number;
  done: boolean;
  hidden: boolean;
  note: string;
}

const App: React.FC = () => {
  const [vops, setVops] = useLocalStorage<Vop[]>('vops', 
    Array.from({ length: 14 }, (_, i) => ({ id: i + 1, done: false, hidden: false, note: '' }))
  );
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);

  const toggleDone = (id: number) => {
    setVops(vops.map(v => v.id === id ? { ...v, done: !v.done } : v));
  };

  const toggleHidden = (id: number) => {
    setVops(vops.map(v => v.id === id ? { ...v, hidden: !v.hidden } : v));
  };

  const updateNote = (id: number, note: string) => {
    setVops(vops.map(v => v.id === id ? { ...v, note } : v));
  };

  const resetAll = () => {
    setVops(vops.map(v => ({ ...v, done: false, hidden: false, note: '' })));
  };

  const visibleVops = [...vops.filter(v => !v.hidden), ...vops.filter(v => v.hidden)];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="space-y-2 mt-4">
        {visibleVops.map(v => (
          <VopItem 
            key={v.id} 
            vop={v} 
            onToggleDone={() => toggleDone(v.id)}
            onToggleHidden={() => toggleHidden(v.id)}
            onUpdateNote={(note) => updateNote(v.id, note)}
          />
        ))}
      </div>
      <Footer onReset={resetAll} />
    </div>
  );
};

export default App;
