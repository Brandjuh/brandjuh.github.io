// src/App.tsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import VopItem from './components/VopItem';
import useLocalStorage from './hooks/useLocalStorage';

interface Vop { id: number; done: boolean; hidden: boolean; note: string; }

const App: React.FC = () => {
  const [vops, setVops] = useLocalStorage<Vop[]>(
    'vops', Array.from({ length: 14 }, (_, i) => ({ id: i+1, done:false, hidden:false, note:'' }))
  );
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);

  const toggleDone = (id:number) => setVops(vops.map(v=>v.id===id?{...v,done:!v.done}:v));
  const toggleHidden = (id:number) => setVops(vops.map(v=>v.id===id?{...v,hidden:!v.hidden}:v));
  const resetAll = () => setVops(vops.map(v=>({ ...v, done:false, hidden:false, note:'' })));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const visible = vops.filter(v=>!v.hidden);
  const hidden = vops.filter(v=>v.hidden);

  return (
    <div className="max-w-md mx-auto p-4">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="space-y-3">
        {visible.map(v => (
          <VopItem key={v.id} vop={v}
            onToggleDone={()=>toggleDone(v.id)}
            onToggleHidden={()=>toggleHidden(v.id)} />
        ))}
        {hidden.length>0 && (
          <details className="mt-4">
            <summary className="text-gray-500 cursor-pointer">Verborgen VOPs ({hidden.length})</summary>
            <div className="space-y-3 mt-2">
              {hidden.map(v => (
                <VopItem key={v.id} vop={v}
                  onToggleDone={()=>toggleDone(v.id)}
                  onToggleHidden={()=>toggleHidden(v.id)} />
              ))}
            </div>
          </details>
        )}
      </div>

      <Footer onReset={resetAll} />
    </div>
  );
};

export default App;
