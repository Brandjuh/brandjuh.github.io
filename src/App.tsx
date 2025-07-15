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
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress Overview */}
        <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Progress Overview</h2>
            <div className="w-full bg-gray-700 h-2 rounded mt-2">
              <div className="bg-blue-500 h-2 rounded" style={{ width: `${(handledCount / vops.length) * 100}%` }} />
            </div>
            <span className="text-sm text-gray-400 mt-1 block">{handledCount} VOPs handled</span>
          </div>
          <div className="text-right text-sm">
            <span className="font-medium">{handledCount}/{vops.length}</span>
            <div className="text-gray-400">{pendingCount} remaining</div>
          </</div>
        </div>

        {/* Grid of VOP cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Quick Actions */}
        <div className="bg-gray-800 p-4 rounded-lg flex space-x-4">
          <button onClick={resetAll} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Reset All</button>
          <button onClick={() => vops.forEach(v=>!v.done && toggleDone(v.id))} className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">Mark All Handled</button>
          <button onClick={() => vops.forEach(v=>!v.hidden && toggleHidden(v.id))} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Enable All</button>
          <button onClick={() => vops.forEach(v=>v.hidden && toggleHidden(v.id))} className="px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700">Disable All</button>
        </div>
      </div>
    </div>
  );
};
export default App;
