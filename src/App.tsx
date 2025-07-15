import React, { useEffect } from 'react';
import VopItem from './components/VopItem';
import useLocalStorage from './hooks/useLocalStorage';

interface Vop { id: number; done: boolean; hidden: boolean; note: string; }

const App: React.FC = () => {
  const [vops, setVops] = useLocalStorage<Vop[]>(
    'vops', Array.from({ length: 14 }, (_, i) => ({ id: i+1, done: false, hidden: false, note: '' }))
  );
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', true);

  useEffect(() => { document.documentElement.classList.toggle('dark', darkMode); }, [darkMode]);

  const toggleDone = (id: number) => setVops(vops.map(v => v.id === id ? { ...v, done: !v.done } : v));
  const toggleHidden = (id: number) => setVops(vops.map(v => v.id === id ? { ...v, hidden: !v.hidden } : v));
  const resetAll = () => setVops(vops.map(v => ({ ...v, done: false, hidden: false, note: '' })));

  const handledCount = vops.filter(v => v.done).length;
  const pendingCount = vops.length - handledCount;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-2xl mx-auto flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Voortgang Overzicht</h2>
        <div className="text-right">
          <div className="text-xl font-bold">{handledCount}/{vops.length}</div>
          <div className="text-gray-400">{pendingCount} resterend</div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {vops.map(v => (
          <VopItem
            key={v.id}
            vop={v}
            onToggleDone={() => toggleDone(v.id)}
            onToggleHidden={() => toggleHidden(v.id)}
            onUpdateNote={(note) => setVops(vops.map(item => item.id === v.id ? { ...item, note } : item))}
          />
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-lg flex flex-wrap gap-3">
        <button onClick={resetAll} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Alles resetten</button>
        <button onClick={() => vops.forEach(v => !v.done && toggleDone(v.id))} className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">Markeer alle afgehandeld</button>
        <button onClick={() => vops.forEach(v => !v.hidden && toggleHidden(v.id))} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Toon alle</button>
        <button onClick={() => vops.forEach(v => v.hidden && toggleHidden(v.id))} className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700">Verberg alle</button>
      </div>
    </div>
  );
};

export default App;
