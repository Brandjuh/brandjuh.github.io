export const styles = {
  overview: {
    container: 'min-h-screen bg-gray-900 text-gray-100 p-6',
    header: 'max-w-2xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-6',
    title: 'text-3xl font-bold text-vigo-blue',
    subtitle: 'text-sm mt-1',
    subtitleCustomColor: 'text-vigo-gray',
    stats: 'flex items-baseline space-x-4 mt-4 sm:mt-0',
    statsCount: 'text-2xl font-semibold text-vigo-orange',
    statsLabel: 'text-gray-500'
  },
  grid: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6',
  quickActions: 'bg-gray-800 p-4 rounded-lg flex flex-wrap gap-3',
  quickButton: 'flex-1 px-4 py-2 rounded transition',
  quickButtonVariants: {
    resetAll: 'bg-red-600 hover:bg-red-700 text-white',
    markAll: 'bg-green-600 hover:bg-green-700 text-white',
    showAll: 'bg-blue-600 hover:bg-blue-700 text-white',
    hideAll: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    locale: 'bg-gray-800 text-white hover:bg-gray-700'
  },
  card: {
    base: 'flex flex-col p-4 rounded-lg shadow-lg transition-colors border',
    visible: 'bg-vigo-blue text-white border-vigo-gray',
    hidden: 'bg-vigo-gray text-gray-700 border-vigo-gray opacity-70',
    doneButton: {
      done: 'bg-vigo-orange hover:bg-vigo-red text-white',
      todo: 'bg-vigo-light hover:bg-vigo-purple text-white'
    }
  }
};
