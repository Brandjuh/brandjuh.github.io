import React from 'react';

const colorClasses = {
  orange: 'bg-vigo-orange hover:bg-vigo-red text-white',
  red: 'bg-vigo-red hover:bg-vigo-purple text-white',
  blue: 'bg-vigo-light-blue hover:bg-vigo-gray text-white'
};

const VigoButton = ({ variant = 'orange', children, onClick }) => (
  <button
    className={`px-4 py-2 rounded ${colorClasses[variant]} transition-colors`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default VigoButton;
