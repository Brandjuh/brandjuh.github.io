import React from 'react';
import VigoCard from './VigoCard';
import VigoButton from './VigoButton';

export default function VigoThemeExample() {
  return (
    <div className="min-h-screen bg-vigo-gray p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-vigo-blue">Viggo Theme Demo</h1>
        <div className="flex space-x-2">
          <VigoButton variant="orange">Action</VigoButton>
          <VigoButton variant="blue">Info</VigoButton>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <VigoCard>
          <h2 className="text-2xl font-semibold">Card Title</h2>
          <p className="mt-2 text-vigo-gray">This is a card using Viggo colors.</p>
          <VigoButton variant="red" className="mt-4">Danger</VigoButton>
        </VigoCard>
        <VigoCard>
          <h2 className="text-2xl font-semibold">Analytics</h2>
          <p className="mt-2 text-vigo-gray">Data insights here.</p>
          <VigoButton variant="blue" className="mt-4">Learn More</VigoButton>
        </VigoCard>
        <VigoCard>
          <h2 className="text-2xl font-semibold">Settings</h2>
          <p className="mt-2 text-vigo-gray">Configure your preferences.</p>
          <VigoButton variant="orange" className="mt-4">Configure</VigoButton>
        </VigoCard>
      </div>

      {/* Footer */}
      <footer className="flex justify-center pt-6 border-t border-vigo-gray">
        <p className="text-vigo-gray">© 2025 Viggo. All rights reserved.</p>
      </footer>
    </div>
  );
}
