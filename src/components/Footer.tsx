import React from 'react';

interface Props {
  onReset: () => void;
}

const Footer: React.FC<Props> = ({ onReset }) => (
  <footer className="mt-4">
    <button onClick={onReset} className="w-full p-2 bg-red-500 text-white rounded">
      Reset alle VOPs
    </button>
  </footer>
);

export default Footer;
