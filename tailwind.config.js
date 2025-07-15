// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        'vigo-blue': '#002E5D',
        'vigo-gray': '#8A8D8F',
        'vigo-orange': '#F58220',
        'vigo-red': '#E30613',
        'vigo-purple': '#7C2851',
        'vigo-light-blue': '#00AEEF',
      }
    }
  },
  plugins: [],
}
